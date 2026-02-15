import { supabase } from "@/lib/auth/supabase-client"

export class UsageService {
  static async checkUsageLimit(
    userId: string,
    limitType: "resumes" | "downloads" | "ai_optimizations",
  ): Promise<boolean> {
    // Get user's current plan
    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select(`
        *,
        subscription_plans (*)
      `)
      .eq("user_id", userId)
      .eq("status", "active")
      .single()

    if (!subscription) {
      // Default to free plan limits
      return this.checkFreePlanLimits(userId, limitType)
    }

    const plan = subscription.subscription_plans
    const currentUsage = await this.getCurrentUsage(userId)

    switch (limitType) {
      case "resumes":
        return plan.max_resumes === null || currentUsage.resumes_created < plan.max_resumes
      case "downloads":
        return plan.max_downloads_per_month === null || currentUsage.downloads_used < plan.max_downloads_per_month
      case "ai_optimizations":
        return (
          plan.ai_optimizations_per_month === null ||
          currentUsage.ai_optimizations_used < plan.ai_optimizations_per_month
        )
      default:
        return false
    }
  }

  static async incrementUsage(userId: string, usageType: "resumes" | "downloads" | "ai_optimizations"): Promise<void> {
    const currentPeriod = this.getCurrentPeriod()

    await supabase
      .from("user_usage")
      .update({
        [`${usageType}_used`]: supabase.rpc("increment_usage", {
          usage_type: usageType,
        }),
      })
      .eq("user_id", userId)
      .eq("period_start", currentPeriod.start)
  }

  static async getCurrentUsage(userId: string) {
    const currentPeriod = this.getCurrentPeriod()

    const { data } = await supabase
      .from("user_usage")
      .select("*")
      .eq("user_id", userId)
      .eq("period_start", currentPeriod.start)
      .single()

    return (
      data || {
        resumes_created: 0,
        downloads_used: 0,
        ai_optimizations_used: 0,
      }
    )
  }

  private static getCurrentPeriod() {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    }
  }

  private static async checkFreePlanLimits(
    userId: string,
    limitType: "resumes" | "downloads" | "ai_optimizations",
  ): Promise<boolean> {
    const usage = await this.getCurrentUsage(userId)

    const freeLimits: Record<"resumes" | "downloads" | "ai_optimizations", number> = {
      resumes: 1,
      downloads: 5,
      ai_optimizations: 3,
    }

    return usage[`${limitType}_used` as keyof typeof usage] < freeLimits[limitType]
  }
}
