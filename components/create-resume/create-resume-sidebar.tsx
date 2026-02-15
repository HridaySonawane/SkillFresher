/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
	FileText,
	Download,
	Share2,
	Save,
	Eye,
	CheckCircle,
} from "lucide-react";

interface CreateResumeSidebarProps {
	currentStep: "template" | "form" | "preview";
	selectedTemplate: string;
	userId: string;
	template?: any; // <-- add this
	loading?: boolean; // <-- add this
}

export function CreateResumeSidebar({
	currentStep,
	template,
	loading,
}: CreateResumeSidebarProps) {

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

	// Use the fetched template if available, otherwise fallback
	const currentTemplate = template || {
		name: "Loading...",
		is_premium: false,
		// ...other fallback fields
	};

	return (
		<div className="flex-1/5 h-full w-full sm:w-64 bg-white dark:bg-gray-950 border-r border-b border-gray-200 dark:border-neutral-800 p-4 space-y-6">
			{/* Progress */}
			<div className="space-y-3">
				<h3 className="font-medium text-gray-900 dark:text-gray-300">
					Progress
				</h3>
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm dark:text-gray-400">
						<span>Resume Creation</span>
						<span className="font-medium">{getProgress()}%</span>
					</div>
					<Progress value={getProgress()} className="h-2" />
					<div className="text-xs text-gray-500 dark:text-gray-400">
						Step{" "}
						{currentStep === "template"
							? "1"
							: currentStep === "form"
								? "2"
								: "3"}{" "}
						of 3
					</div>
				</div>
			</div>

			{/* Current Template */}
			<div className="space-y-3">
				<h3 className="font-medium text-gray-900 dark:text-gray-300 flex items-center gap-2">
					<FileText className="w-4 h-4" />
					Selected Template
				</h3>
				<Card className="cursor-pointer hover:shadow-md transition-shadow">
					<CardContent className="p-3">
						<div className="relative aspect-[3/4] bg-gray-100 rounded mb-2 flex items-center justify-center">
							<span className="text-gray-500 dark:text-gray-400 text-xs">
								Template Preview
							</span>
							{/* <Image
								src={template.preview_image_url}
								alt="preview"
								fill
							/> */}
						</div>
						<div className="flex items-center justify-between">
							<div className="text-sm font-medium">
								{loading ? "Loading..." : currentTemplate.name}
							</div>
							{currentTemplate.is_premium && (
								<Badge variant="secondary" className="text-xs">
									Premium
								</Badge>
							)}
						</div>
						<Badge
							variant="default"
							className="text-xs mt-1 w-full"
						>
							Active
						</Badge>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<div className="space-y-3">
				<h3 className="font-medium text-gray-900 dark:text-gray-300">
					Quick Actions
				</h3>
				<div className="space-y-2">
					{currentStep === "form" && (
						<>
							<Button
								variant="outline"
								size="sm"
								className="w-full justify-start"
							>
								<Save className="w-4 h-4 mr-2" />
								Save Draft
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="w-full justify-start"
							>
								<Eye className="w-4 h-4 mr-2" />
								Preview
							</Button>
						</>
					)}

					{currentStep === "preview" && (
						<>
							<Button
								variant="outline"
								size="sm"
								className="w-full justify-start"
							>
								<Download className="w-4 h-4 mr-2" />
								Download PDF
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="w-full justify-start"
							>
								<Share2 className="w-4 h-4 mr-2" />
								Share Resume
							</Button>
						</>
					)}
				</div>
			</div>

			{/* Tips */}
			<div className="space-y-3">
				<h3 className="font-medium text-gray-900 dark:text-gray-300">
					Tips
				</h3>
				<Card>
					<CardContent className="p-3 space-y-2">
						{currentStep === "template" && (
							<div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
								<div className="flex items-start gap-2">
									<CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
									<span>
										Choose a template that matches your
										industry
									</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
									<span>
										Consider ATS-friendly designs for better
										compatibility
									</span>
								</div>
							</div>
						)}

						{currentStep === "form" && (
							<div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
								<div className="flex items-start gap-2">
									<CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
									<span>
										Use action verbs to describe your
										achievements
									</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
									<span>
										Quantify your accomplishments with
										numbers
									</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
									<span>
										Keep descriptions concise and impactful
									</span>
								</div>
							</div>
						)}

						{currentStep === "preview" && (
							<div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
								<div className="flex items-start gap-2">
									<CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
									<span>
										Review for spelling and grammar errors
									</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
									<span>
										Ensure all contact information is
										correct
									</span>
								</div>
								<div className="flex items-start gap-2">
									<CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
									<span>
										Download in PDF format for best
										compatibility
									</span>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Help */}
			<div className="space-y-3">
				<h3 className="font-medium text-gray-900 dark:text-gray-300">
					Need Help?
				</h3>
				<div className="space-y-2">
					<Button
						variant="ghost"
						size="sm"
						className="w-full justify-start text-blue-600"
					>
						View Tutorial
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="w-full justify-start text-blue-600"
					>
						Contact Support
					</Button>
				</div>
			</div>
		</div>
	);
}
