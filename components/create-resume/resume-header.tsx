"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ResumeHeaderProps {
  currentStep: "template" | "form" | "preview";
  onBackToTemplates: () => void;
  onBackToForm: () => void;
  userId: string;
  progress: number;
  templateName?: string;
}

export function ResumeHeader({
  currentStep,
  onBackToTemplates,
  onBackToForm,
  userId,
  templateName,
}: ResumeHeaderProps) {
  const getStepTitle = () => {
    switch (currentStep) {
      case "template":
        return "Choose Template";
      case "form":
        return "Fill Resume Details";
      case "preview":
        return "Review & Download";
      default:
        return "Create Resume";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "template":
        return "Select a professional template for your resume";
      case "form":
        return "Add your information to create your resume";
      case "preview":
        return "Review your resume and download it";
      default:
        return "Create your professional resume";
    }
  };

  // const getStepNumber = () => {
  // 	switch (currentStep) {
  // 		case "template":
  // 			return 1;
  // 		case "form":
  // 			return 2;
  // 		case "preview":
  // 			return 3;
  // 		default:
  // 			return 1;
  // 	}
  // };

  return (
    <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-neutral-800 px-4 sm:px-6 py-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-around gap-4">
          {/* Back Button */}
          {currentStep === "template" ? (
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/${userId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          ) : currentStep === "form" ? (
            <Button variant="ghost" size="sm" onClick={onBackToTemplates}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Templates
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={onBackToForm}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Edit
            </Button>
          )}

          <div className="hidden sm:block h-6 w-px bg-gray-300" />

          <div>
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-300">
              {getStepTitle()}
            </h1>
            <p className="text-sm text-gray-500">{getStepDescription()}</p>
          </div>

          {templateName && currentStep !== "template" && (
            <>
              <div className="hidden sm:block h-6 w-px bg-gray-300" />
              <div className="text-sm">
                <span className="text-gray-500">Template:</span>
                <span className="font-medium text-gray-900 dark:text-gray-300 ml-1">
                  {templateName}
                </span>
              </div>
            </>
          )}
        </div>

        {/* <div className="flex flex-wrap gap-4 items-center">
					<div className="flex items-center gap-3">
						<div className="text-sm text-gray-500 dark:text-gray-600">
							Step {getStepNumber()} of 3
						</div>
						<div className="w-24 sm:w-32">
							<Progress value={progress} className="h-2" />
						</div>
						<div className="text-sm font-medium text-gray-900 dark:text-gray-500">
							{progress}%
						</div>
					</div>

					<div className="flex flex-wrap gap-2">
						{currentStep === "form" && (
							<>
								<Button variant="outline" size="sm">
									<Save className="w-4 h-4 mr-2" />
									Save Draft
								</Button>
								<Button variant="outline" size="sm">
									<Eye className="w-4 h-4 mr-2" />
									Preview
								</Button>
								<Button variant="outline" size="sm">
									<Settings className="w-4 h-4 mr-2" />
									Settings
								</Button>
							</>
						)}

						{currentStep === "preview" && (
							<>
								<Button variant="outline" size="sm">
									<Share2 className="w-4 h-4 mr-2" />
									Share
								</Button>
								<Button size="sm">
									<Download className="w-4 h-4 mr-2" />
									Download
								</Button>
							</>
						)}
					</div>
				</div> */}
      </div>

      {/* Step Indicator */}
      <div className="mt-6 overflow-x-auto">
        <div className="flex items-center justify-center min-w-[360px] sm:min-w-0">
          <div className="flex items-center space-x-4">
            {[
              {
                step: 1,
                label: "Template",
                active: currentStep === "template",
                completed: ["form", "preview"].includes(currentStep),
              },
              {
                step: 2,
                label: "Details",
                active: currentStep === "form",
                completed: ["preview"].includes(currentStep),
              },
              {
                step: 3,
                label: "Preview",
                active: currentStep === "preview",
                completed: false,
              },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    item.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : item.active
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                  }`}
                >
                  {item.completed ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    item.step
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    item.active
                      ? "text-blue-600"
                      : item.completed
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
                {index < 2 && (
                  <div
                    className={`w-8 h-0.5 mx-2 ${
                      item.completed ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
