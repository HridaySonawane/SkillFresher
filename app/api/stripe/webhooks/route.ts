/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/stripe-server"
import { supabase } from "@/lib/auth/supabase-client"
import { headers } from "next/headers"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = (await headers()).get("stripe-signature")!

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(event.data.object)
        break

      case "customer.subscription.deleted":
        await handleSubscriptionCanceled(event.data.object)
        break

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object)
        break

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleSubscriptionUpdate(subscription: any) {
  const userId = subscription.metadata.userId

  await supabase.from("user_subscriptions").upsert({
    user_id: userId,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer,
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  })

  // Update user profile subscription tier
  const priceId = subscription.items.data[0].price.id
  const planId = getPlanIdFromPriceId(priceId)

  await supabase.from("user_profiles").update({ subscription_tier: planId }).eq("id", userId)
}

async function handleSubscriptionCanceled(subscription: any) {
  const userId = subscription.metadata.userId

  await supabase
    .from("user_subscriptions")
    .update({
      status: "canceled",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id)

  // Downgrade to free tier
  await supabase.from("user_profiles").update({ subscription_tier: "free" }).eq("id", userId)
}

async function handlePaymentSucceeded(invoice: any) {
  const subscriptionId = invoice.subscription
  // const customerId = invoice.customer

  // Log successful payment
  await supabase.from("payments").insert({
    stripe_payment_intent_id: invoice.payment_intent,
    amount_cents: invoice.amount_paid,
    currency: invoice.currency,
    status: "succeeded",
    description: `Subscription payment for ${subscriptionId}`,
  })
}

async function handlePaymentFailed(invoice: any) {
  // Handle failed payment - send email, update subscription status, etc.
  console.log("Payment failed for invoice:", invoice.id)
}

function getPlanIdFromPriceId(priceId: string): string {
  // Map Stripe price IDs to your plan IDs
  const priceToPlans: Record<string, string> = {
    [process.env.STRIPE_PROFESSIONAL_PRICE_ID!]: "professional",
    [process.env.STRIPE_PREMIUM_PRICE_ID!]: "premium",
    [process.env.STRIPE_ENTERPRISE_PRICE_ID!]: "enterprise",
  }

  return priceToPlans[priceId] || "free"
}
