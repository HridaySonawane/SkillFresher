/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's subscription from database
    // console.log("User ID:", user.id);
    const { data: subscription, error } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();
    // console.log("Subscription found:", subscription, "Error:", error);

    // if (!subscription) {
    //   return NextResponse.json({
    //     subscription: null,
    //     planId: `${subscription?.plan_id || "moft"}`,
    //     status: `${subscription?.status || "canceled"}`,
    //   })
    // }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      subscription,
      planId: subscription?.plan_id || "free",
      status: subscription?.status || "canceled",
    });

    // // Check if subscription is still active in Stripe
    // try {
    //   const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id)

    //   // Update local database if status changed
    //   if (stripeSubscription.status !== subscription.status) {
    //     await supabase
    //       .from("user_subscriptions")
    //       .update({
    //         status: stripeSubscription.status,
    //         updated_at: new Date().toISOString(),
    //       })
    //       .eq("id", subscription.id)

    //     // Update user profile if subscription is canceled
    //     if (stripeSubscription.status === "canceled" || stripeSubscription.status === "incomplete_expired") {
    //       await supabase.from("user_profiles").update({ subscription_tier: "free" }).eq("id", user.id)
    //     }
    //   }

    //   return NextResponse.json({
    //     subscription: {
    //       ...subscription,
    //       status: stripeSubscription.status,
    //     },
    //     planId: stripeSubscription.status === "active" ? subscription.plan_id : "free",
    //     status: stripeSubscription.status,
    //   })
    // } catch (stripeError) {
    //   // If subscription doesn't exist in Stripe, mark as canceled
    //   await supabase
    //     .from("user_subscriptions")
    //     .update({
    //       status: "canceled",
    //       updated_at: new Date().toISOString(),
    //     })
    //     .eq("id", subscription.id)

    //   await supabase.from("user_profiles").update({ subscription_tier: "free" }).eq("id", user.id)

    //   return NextResponse.json({
    //     subscription: null,
    //     planId: "free",
    //     status: "canceled",
    //   })
    // }
  } catch (error: any) {
    console.error("Check subscription error:", error)
    return NextResponse.json({ error: "Failed to check subscription" }, { status: 400 })
  }
}
