import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Download, Shield, Zap, Users } from "lucide-react";

const features = [
	{
		icon: <Sparkles className="w-6 h-6" />,
		title: "AI-Powered Optimization",
		description:
			"Our AI analyzes your resume and suggests improvements for better ATS compatibility and impact.",
		badge: "New",
	},
	{
		icon: <Target className="w-6 h-6" />,
		title: "ATS-Optimized Templates",
		description:
			"Professional templates designed to pass through Applicant Tracking Systems with 95% success rate.",
		badge: null,
	},
	{
		icon: <Download className="w-6 h-6" />,
		title: "Multiple Export Formats",
		description:
			"Download your resume in PDF, DOCX, or plain text format. Perfect for any application requirement.",
		badge: null,
	},
	{
		icon: <Shield className="w-6 h-6" />,
		title: "Privacy First",
		description:
			"Your data is encrypted and secure. We never share your personal information with third parties.",
		badge: null,
	},
	{
		icon: <Zap className="w-6 h-6" />,
		title: "Real-time Preview",
		description:
			"See your changes instantly with our live preview. No more guessing how your resume will look.",
		badge: null,
	},
	{
		icon: <Users className="w-6 h-6" />,
		title: "Team Collaboration",
		description:
			"Share your resume with mentors, career coaches, or team members for feedback and suggestions.",
		badge: "Pro",
	},
];

export function LandingFeatures() {
	return (
		<section
			id="features"
			className="py-20 bg-[#f0eeeb] dark:bg-none dark:bg-gray-950"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-300 mb-4">
						Everything you need to build the perfect resume
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-500 max-w-3xl mx-auto">
						From AI-powered content suggestions to ATS optimization,
						we&apos;ve got all the tools you need to land your dream job.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<Card
							key={index}
							className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-card/50 dark:inset-shadow-sm dark:inset-shadow-neutral-500/20 dark:backdrop-blur-md "
						>
							<CardHeader>
								<div className="flex items-center justify-between mb-2">
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
										{feature.icon}
									</div>
									{feature.badge && (
										<Badge
											variant={
												feature.badge === "New"
													? "default"
													: "secondary"
											}
										>
											{feature.badge}
										</Badge>
									)}
								</div>
								<CardTitle className="text-xl dark:text-gray-300">
									{feature.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-gray-600 dark:text-gray-500 leading-relaxed">
									{feature.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
