// app/pdf-preview/[resumeId]/page.tsx
import { ResumePreview } from "@/components/create-resume/resume-preview";
import { fetchResumeDataById } from "@/lib/resume/fetchResumeData";

export default async function PDFPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ resumeId: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { resumeId } = await params;
  const resumeData = await fetchResumeDataById(resumeId);
  const isPdf = searchParams?.pdf === "1";

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <ResumePreview
        templateId={resumeData.templateId}
        data={resumeData}
        currentStep="preview"
        isPdf={isPdf}
      />
    </div>
  );
}
