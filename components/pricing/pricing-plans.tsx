"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Star, Zap, Users, Crown } from "lucide-react";

const plans = [
	{
		id: "free",
		name: "Free",
		description: "Perfect for getting started",
		monthlyPrice: 0,
		yearlyPrice: 0,
		icon: <Star className="w-5 h-5" />,
		popular: false,
		features: [
			"1 resume",
			"3 basic templates",
			"3 AI optimizations/month",
			"5 downloads/month",
			"PDF format only",
			"Basic ATS scoring",
			"Email support",
		],
		limitations: [
			"Limited templates",
			"No DOCX export",
			"Basic support only",
		],
	},
	{
		id: "professional",
		name: "Professional",
		description: "For active job seekers",
		monthlyPrice: 9.99,
		yearlyPrice: 99.99,
		icon: <Zap className="w-5 h-5" />,
		popular: true,
		features: [
			"5 resumes",
			"15+ premium templates",
			"25 AI optimizations/month",
			"50 downloads/month",
			"PDF + DOCX formats",
			"Advanced ATS analysis",
			"Job matching suggestions",
			"Cover letter generation",
			"Priority email support",
		],
		limitations: [],
	},
	{
		id: "premium",
		name: "Premium",
		description: "For serious professionals",
		monthlyPrice: 19.99,
		yearlyPrice: 199.99,
		icon: <Crown className="w-5 h-5" />,
		popular: false,
		features: [
			"Unlimited resumes",
			"All premium templates",
			"Unlimited AI optimizations",
			"Unlimited downloads",
			"All export formats",
			"Priority AI processing",
			"Advanced analytics dashboard",
			"LinkedIn integration",
			"Interview prep tools",
			"Phone + email support",
		],
		limitations: [],
	},
	{
		id: "enterprise",
		name: "Enterprise",
		description: "For teams and organizations",
		monthlyPrice: 49.99,
		yearlyPrice: 499.99,
		icon: <Users className="w-5 h-5" />,
		popular: false,
		features: [
			"Everything in Premium",
			"Team collaboration tools",
			"White-label options",
			"API access",
			"Custom templates",
			"Bulk operations",
			"Advanced reporting",
			"Dedicated account manager",
			"Custom integrations",
			"SLA guarantee",
		],
		limitations: [],
	},
];

export function PricingPlans() {
	const [isYearly, setIsYearly] = useState(false);

	const handleSubscribe = (planId: string) => {
		if (planId === "free") {
			window.location.href = "/auth/signup";
		} else {
			window.location.href = `/checkout?plan=${planId}&billing=${isYearly ? "yearly" : "monthly"}`;
		}
	};

	return (
		<div className="py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Billing Toggle */}
				<div className="flex items-center justify-center gap-4 mb-12">
					<span
						className={
							!isYearly
								? "font-semibold text-gray-900"
								: "text-gray-500"
						}
					>
						Monthly
					</span>
					<Switch checked={isYearly} onCheckedChange={setIsYearly} />
					<span
						className={
							isYearly
								? "font-semibold text-gray-900"
								: "text-gray-500"
						}
					>
						Yearly
						<Badge
							variant="secondary"
							className="ml-2 bg-green-100 text-green-800"
						>
							Save up to 17%
						</Badge>
					</span>
				</div>

				{/* Plans Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{plans.map((plan) => (
						<Card
							key={plan.id}
							className={`relative ${
								plan.popular
									? "border-blue-500 shadow-lg scale-105"
									: "border-gray-200 hover:border-gray-300"
							} transition-all duration-300`}
						>
							{plan.popular && (
								<Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
									Most Popular
								</Badge>
							)}

							<CardHeader className="text-center pb-4">
								<div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
									{plan.icon}
								</div>
								<CardTitle className="text-xl">
									{plan.name}
								</CardTitle>
								<CardDescription className="text-sm">
									{plan.description}
								</CardDescription>

								<div className="mt-6">
									<div className="text-4xl font-bold text-gray-900">
										$
										{isYearly
											? plan.yearlyPrice
											: plan.monthlyPrice}
										{plan.monthlyPrice > 0 && (
											<span className="text-lg font-normal text-gray-500">
												/{isYearly ? "year" : "month"}
											</span>
										)}
									</div>
									{isYearly && plan.monthlyPrice > 0 && (
										<div className="text-sm text-gray-500 mt-1">
											$
											{(plan.yearlyPrice / 12).toFixed(2)}
											/month billed annually
										</div>
									)}
								</div>
							</CardHeader>

							<CardContent className="space-y-6">
								<Button
									className={`w-full ${
										plan.popular
											? "bg-blue-600 hover:bg-blue-700"
											: plan.id === "free"
												? "bg-gray-900 hover:bg-gray-800"
												: ""
									}`}
									variant={
										plan.popular || plan.id === "free"
											? "default"
											: "outline"
									}
									onClick={() => handleSubscribe(plan.id)}
								>
									{plan.id === "free"
										? "Get Started Free"
										: `Start ${plan.name}`}
								</Button>

								<div className="space-y-3">
									<h4 className="font-semibold text-sm text-gray-900">
										What&apos;s included:
									</h4>
									{plan.features.map((feature, index) => (
										<div
											key={index}
											className="flex items-start gap-3 text-sm"
										>
											<Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-gray-700">
												{feature}
											</span>
										</div>
									))}
								</div>

								{plan.limitations.length > 0 && (
									<div className="space-y-2 pt-4 border-t border-gray-100">
										<h4 className="font-semibold text-sm text-gray-500">
											Limitations:
										</h4>
										{plan.limitations.map(
											(limitation, index) => (
												<div
													key={index}
													className="flex items-start gap-3 text-sm"
												>
													<span className="w-4 h-4 text-center text-gray-400 flex-shrink-0 mt-0.5">
														•
													</span>
													<span className="text-gray-500">
														{limitation}
													</span>
												</div>
											)
										)}
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>

				{/* Enterprise CTA */}
				<div className="mt-16 text-center">
					<div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Need a custom solution?
						</h3>
						<p className="text-gray-600 mb-6">
							We offer custom pricing for large teams, educational
							institutions, and enterprise customers.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								variant="outline"
								className="bg-transparent"
							>
								Contact Sales
							</Button>
							<Button size="lg">Schedule Demo</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
