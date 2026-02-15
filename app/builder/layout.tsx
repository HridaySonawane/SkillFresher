import { Suspense } from "react";
import { BuilderHeader } from "@/components/builder/builder-header";
import { BuilderSidebar } from "@/components/builder/builder-sidebar";
import { ResumeBuilderProvider } from "@/components/builder/resume-builder-context";

export default function BuilderLayout({
	preview,
	form,
}: {
	children: React.ReactNode;
	preview: React.ReactNode;
	form: React.ReactNode;
}) {
	return (
		<ResumeBuilderProvider>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-800">
				<BuilderHeader />
				<div className="flex h-[calc(100vh-64px)]">
					{/* Left Sidebar - Template Selection */}
					<BuilderSidebar />

					{/* Main Content Area */}
					<div className="flex-1 flex">
						{/* Form Slot */}
						<div className="w-1/2 border-r border-gray-200">
							<Suspense
								fallback={
									<div className="p-6">Loading form...</div>
								}
							>
								{form}
							</Suspense>
						</div>

						{/* Preview Slot */}
						<div className="w-1/2 bg-white">
							<Suspense
								fallback={
									<div className="p-6">
										Loading preview...
									</div>
								}
							>
								{preview}
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</ResumeBuilderProvider>
	);
}
