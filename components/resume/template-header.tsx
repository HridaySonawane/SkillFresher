"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Download } from "lucide-react";
import Link from "next/link";

interface ResumeHeaderProps {
  userId: string;
}

export function TemplateHeader({ userId }: ResumeHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/${userId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-300 mb-4">
            All Your Resumes
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Review all your resume at one place, choose the best one for your
            next job application.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <Link href="/auth/signup">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>10K+ Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>AI-Enhanced</span>
            </div>
            <div>
              <span>95% ATS Pass Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
