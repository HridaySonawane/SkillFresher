/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { ResumeHeader } from "@/components/create-resume/resume-header";
import { TemplateSelection } from "@/components/create-resume/template-selection";
import { ResumeForm } from "@/components/create-resume/resume-form";
import { ResumePreview } from "@/components/create-resume/resume-preview";
import type { ResumeData } from "@/lib/document-generators/types";
import { useTemplateData } from "@/hooks/use-template-data";
import React, { useState } from "react";
import { insertResume } from "@/lib/resume/fetchResumeData";

export default function CreateResumePage() {
  const params = useParams();
  const userId = params.userId as string;
  console.log("User Id:", userId);

  const [selectedTemplate, setSelectedTemplate] = useState(
    "modern-professional",
  );
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });
  const [currentStep, setCurrentStep] = useState<
    "template" | "form" | "preview"
  >("template");

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentStep("form");
  };

  const handleFormComplete = () => {
    setCurrentStep("preview");
  };

  const handleBackToForm = () => {
    setCurrentStep("form");
  };

  const handleBackToTemplates = () => {
    setCurrentStep("template");
  };

  const getProgress = () => {
    switch (currentStep) {
      case "template":
        return 33;
      case "form":
        return 66;
      case "preview":
        return 100;
      default:
        return 0;
    }
  };

  const getTemplateName = () => {
    const templates = {
      "modern-professional": "Modern Professional",
      "creative-designer": "Creative Designer",
      "tech-minimalist": "Tech Minimalist",
      "executive-classic": "Executive Classic",
      "academic-researcher": "Academic & Research",
      "startup-founder": "Startup Founder",
    };
    return (
      templates[selectedTemplate as keyof typeof templates] ||
      "Modern Professional"
    );
  };

  const { template, loading } = useTemplateData(selectedTemplate);

  const handleDownloadPdf = async () => {
    try {
      const inserted = await insertResume(
        userId,
        resumeData,
        selectedTemplate,
        "new resume",
      );
      const resumeId = inserted.id;
      const url = encodeURIComponent(
        `http://localhost:3000/pdf-preview/${resumeId}?pdf=1`,
      );
      window.open(`/api/generate-resume?url=${url}`, "_blank");
    } catch (err: any) {
      alert("Failed to save resume: " + err.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col w-full items-center justify-center bg-gray-50 dark:bg-gray-950`}
    >
      <ResumeHeader
        currentStep={currentStep}
        onBackToTemplates={handleBackToTemplates}
        onBackToForm={handleBackToForm}
        userId={userId}
        progress={getProgress()}
        templateName={
          currentStep !== "template" ? getTemplateName() : undefined
        }
      />

      <div className="flex justify-center items-baseline h-full w-full">
        {/* Left Sidebar */}
        {/* <CreateResumeSidebar
					currentStep={currentStep}
					selectedTemplate={selectedTemplate}
					userId={userId}
					template={template}
					loading={loading}
				/> */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full lg:flex-row">
          {/* Form/Content Area */}
          <div
            className={
              currentStep === "template"
                ? "w-full"
                : "w-full lg:w-1/2 border-r border-gray-200"
            }
          >
            {currentStep === "template" && (
              <TemplateSelection
                onTemplateSelect={handleTemplateSelect}
                userId={userId}
              />
            )}

            {currentStep === "form" && (
              <ResumeForm
                data={resumeData}
                onDataChange={setResumeData}
                templateId={selectedTemplate}
                onComplete={handleFormComplete}
                userId={userId}
              />
            )}

            {currentStep === "preview" && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
                    Resume Created Successfully!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your resume is ready for download and sharing.
                  </p>
                  <div className="space-x-4">
                    <button
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      onClick={handleDownloadPdf}
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={handleBackToForm}
                      className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
                    >
                      Edit Resume
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Area */}
          {currentStep !== "template" && (
            <div className="flex-1 w-full bg-white">
              {loading ? (
                <div>Loading template...</div>
              ) : template ? (
                <ResumePreview
                  templateId={template.id}
                  data={resumeData}
                  currentStep={currentStep}
                />
              ) : (
                <div>No template found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
