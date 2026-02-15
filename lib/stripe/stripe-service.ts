/* eslint-disable @typescript-eslint/no-explicit-any */
import { stripe } from "@/lib/stripe/stripe-server"
import { supabase } from "@/lib/auth/supabase-client"

export class StripeService {
  // Create Stripe customer
  static async createCustomer(userId: string, email: string, name?: string) {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId,
      },
    })

    // Store customer ID in database
    await supabase.from("user_profiles").update({ stripe_customer_id: customer.id }).eq("id", userId)

    return customer
  }

  // Create subscription
  static async createSubscription(customerId: string, priceId: string, userId: string) {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        userId,
      },
    })

    // Store subscription in database
    const typedSubscription = subscription as any
    await supabase.from("user_subscriptions").insert({
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: customerId,
      status: subscription.status,
      current_period_start: new Date(typedSubscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(typedSubscription.current_period_end * 1000).toISOString(),
    })

    return subscription
  }

  // Update subscription (upgrade/downgrade)
  static async updateSubscription(subscriptionId: string, newPriceId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      proration_behavior: "create_prorations",
    })

    return updatedSubscription
  }

  // Cancel subscription
  static async cancelSubscription(subscriptionId: string, immediately = false) {
    if (immediately) {
      return await stripe.subscriptions.cancel(subscriptionId)
    } else {
      return await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      })
    }
  }

  // Create customer portal session
  static async createPortalSession(customerId: string, returnUrl: string) {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session
  }

  // Create checkout session
  static async createCheckoutSession(customerId: string, priceId: string, successUrl: string, cancelUrl: string) {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      customer_update: {
        address: "auto",
        name: "auto",
      },
    })

    return session
  }
}
