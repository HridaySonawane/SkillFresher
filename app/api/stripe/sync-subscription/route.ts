/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/stripe-server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Get authenticated user
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    })

    if (!session.subscription) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 })
    }

    const subscription = session.subscription as any

    // Get the price ID to determine the plan
    const priceId = subscription.items.data[0].price.id
    let planId = "free"

    // Map price IDs to plan names
    if (
      priceId === process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID ||
      priceId === process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_YEARLY_PRICE_ID
    ) {
      planId = "professional"
    } else if (
      priceId === process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID ||
      priceId === process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID
    ) {
      planId = "premium"
    } else if (
      priceId === process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID ||
      priceId === process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID
    ) {
      planId = "enterprise"
    }

    // Update user subscription in database
    await supabase.from("user_subscriptions").upsert({
      user_id: user.id,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      status: subscription.status,
      plan_id: planId,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    // Update user profile subscription tier
    await supabase.from("user_profiles").update({ subscription_tier: planId }).eq("id", user.id)

    return NextResponse.json({ success: true, planId })
  } catch (error: any) {
    console.error("Sync subscription error:", error)
    return NextResponse.json({ error: "Failed to sync subscription" }, { status: 500 })
  }
}
