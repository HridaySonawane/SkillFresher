"use client"

import { ResumePreview } from "@/components/builder/resume-preview"
// import { useSearchParams } from "next/navigation"
import { useResumeBuilder } from "@/components/builder/resume-builder-context"

export default function PreviewPage() {
  // const searchParams = useSearchParams()
  // const templateId = searchParams.get("template") || "modern-professional"
  const { resumeData, templateId: contextTemplateId } = useResumeBuilder()
  
  return (
    <div className="h-full overflow-y-auto bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <ResumePreview templateId={contextTemplateId} data={resumeData} />
      </div>
    </div>
  )
}
