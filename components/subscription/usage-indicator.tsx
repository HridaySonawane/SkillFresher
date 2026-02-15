"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsageService } from "@/lib/subscription/usage-service";

interface UsageData {
  resumes_created: number;
  downloads_used: number;
  ai_optimizations_used: number;
}

interface PlanLimits {
  max_resumes: number | null;
  max_downloads_per_month: number | null;
  ai_optimizations_per_month: number | null;
}

export function UsageIndicator({ userId }: { userId: string }) {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [limits, setLimits] = useState<PlanLimits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsageData();
  }, [userId]);

  const loadUsageData = async () => {
    try {
      const [usageData, limitsData] = await Promise.all([
        UsageService.getCurrentUsage(userId),
        UsageService.getPlanLimits(userId),
      ]);

      setUsage(usageData);
      setLimits(limitsData);
    } catch (error) {
      console.error("Failed to load usage data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !usage || !limits) {
    return <div>Loading usage data...</div>;
  }

  const getUsagePercentage = (used: number, limit: number | null) => {
    if (limit === null) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const isNearLimit = (used: number, limit: number | null) => {
    if (limit === null) return false;
    return used / limit >= 0.8;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Usage This Month</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resumes */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Resumes Created</span>
            <span>
              {usage.resumes_created}
              {limits.max_resumes ? ` / ${limits.max_resumes}` : " (Unlimited)"}
            </span>
          </div>
          {limits.max_resumes && (
            <Progress
              value={getUsagePercentage(
                usage.resumes_created,
                limits.max_resumes,
              )}
              className={
                isNearLimit(usage.resumes_created, limits.max_resumes)
                  ? "bg-red-100"
                  : ""
              }
            />
          )}
        </div>

        {/* Downloads */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Downloads</span>
            <span>
              {usage.downloads_used}
              {limits.max_downloads_per_month
                ? ` / ${limits.max_downloads_per_month}`
                : " (Unlimited)"}
            </span>
          </div>
          {limits.max_downloads_per_month && (
            <Progress
              value={getUsagePercentage(
                usage.downloads_used,
                limits.max_downloads_per_month,
              )}
              className={
                isNearLimit(
                  usage.downloads_used,
                  limits.max_downloads_per_month,
                )
                  ? "bg-red-100"
                  : ""
              }
            />
          )}
        </div>

        {/* AI Optimizations */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>AI Optimizations</span>
            <span>
              {usage.ai_optimizations_used}
              {limits.ai_optimizations_per_month
                ? ` / ${limits.ai_optimizations_per_month}`
                : " (Unlimited)"}
            </span>
          </div>
          {limits.ai_optimizations_per_month && (
            <Progress
              value={getUsagePercentage(
                usage.ai_optimizations_used,
                limits.ai_optimizations_per_month,
              )}
              className={
                isNearLimit(
                  usage.ai_optimizations_used,
                  limits.ai_optimizations_per_month,
                )
                  ? "bg-red-100"
                  : ""
              }
            />
          )}
        </div>

        {/* Upgrade prompt if near limits */}
        {(isNearLimit(usage.resumes_created, limits.max_resumes) ||
          isNearLimit(usage.downloads_used, limits.max_downloads_per_month) ||
          isNearLimit(
            usage.ai_optimizations_used,
            limits.ai_optimizations_per_month,
          )) && (
          <div className="pt-4 border-t">
            <p className="text-sm text-amber-600 mb-2">
              You&apos;re approaching your plan limits. Upgrade for unlimited
              access!
            </p>
            <Button size="sm" className="w-full">
              Upgrade Plan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
