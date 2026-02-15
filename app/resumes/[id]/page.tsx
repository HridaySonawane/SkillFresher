"use client";

import { ResumeGallery } from "@/components/resume/template-gallery";
import { TemplateHeader } from "@/components/resume/template-header";
import { TemplateFilters } from "@/components/resume/template-filters";
import { useParams } from "next/navigation";

export default function ResumePage() {
	const params = useParams();
	const userId = params.id as string;
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:bg-gray-950">
			<TemplateHeader userId={userId} />
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-gray-950">
				{/* <TemplateCategories /> */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8 dark:bg-gray-950">
					<div className="lg:col-span-1">
						<TemplateFilters />
					</div>
					<div className="lg:col-span-3">
						<ResumeGallery />
					</div>
				</div>
			</div>
		</div>
	);
}
