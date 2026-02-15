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
import Link from "next/link";

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
			"1 resume download per month",
			"3 basic templates",
			"PDF export only",
			"Email support",
		],
		limitations: ["Limited customization", "No premium templates"],
	},
	{
		id: "professional",
		name: "Professional",
		description: "Perfect for active job seekers",
		monthlyPrice: 9.99,
		yearlyPrice: 99.99,
		icon: <Zap className="w-5 h-5" />,
		popular: true,
		features: [
			"Unlimited resume downloads",
			"15+ premium templates",
			"AI-powered suggestions",
			"PDF & DOCX export",
			"Priority email support",
			"Custom sections",
		],
		limitations: [],
	},
	{
		id: "premium",
		name: "Premium",
		description: "Everything you need for success",
		monthlyPrice: 19.99,
		yearlyPrice: 199.99,
		icon: <Crown className="w-5 h-5" />,
		popular: false,
		features: [
			"Everything in Professional",
			"Cover letter generator",
			"LinkedIn optimization",
			"Interview preparation",
			"ATS optimization score",
			"Phone support",
		],
		limitations: [],
	},
	{
		id: "enterprise",
		name: "Enterprise",
		description: "Advanced features for teams",
		monthlyPrice: 49.99,
		yearlyPrice: 499.99,
		icon: <Users className="w-5 h-5" />,
		popular: false,
		features: [
			"Everything in Premium",
			"Team collaboration",
			"Admin dashboard",
			"Custom branding",
			"API access",
			"Dedicated support",
		],
		limitations: [],
	},
];

export function PricingPlansWithCheckout() {
	const [isYearly, setIsYearly] = useState(false);

	const getCheckoutUrl = (planId: string, interval: string) => {
		return `/checkout?plan=${planId}_${interval}`;
	};

	return (
		<div className="py-16 dark:bg-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-4">
						Choose the Perfect Plan for Your Career
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
						Start building professional resumes that get you hired
					</p>

					{/* Billing Toggle */}
					<div className="flex items-center justify-center gap-4">
						<span
							className={
								!isYearly
									? "font-semibold text-gray-900 dark:text-gray-300"
									: "text-gray-500 dark:text-gray-400"
							}
						>
							Monthly
						</span>
						<Switch
							checked={isYearly}
							onCheckedChange={setIsYearly}
						/>
						<span
							className={
								isYearly
									? "font-semibold text-gray-900 dark:text-gray-300"
									: "text-gray-500 dark:text-gray-400"
							}
						>
							Yearly
							<Badge
								variant="secondary"
								className="ml-2 bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-950"
							>
								Save up to 17%
							</Badge>
						</span>
					</div>
				</div>

				{/* Plans Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{plans.map((plan) => (
						<Card
							key={plan.id}
							className={`relative ${
								plan.popular
									? "border-blue-500 shadow-lg dark:shadow-blue-600/50 dark:hover:shadow-xl dark:hover:shadow-blue-500/60 scale-105"
									: "border-gray-200 dark:shadow-lg dark:shadow-gray-600/80 hover:border-gray-300 dark:hover:shadow-xl dark:hover:shadow-gray-500/60"
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
									<div className="text-4xl font-bold text-gray-900 dark:text-gray-300">
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
								{plan.id === "free" ? (
									<Button
										className="w-full bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
										variant="outline"
										asChild
									>
										<Link href="/auth/signup">
											Get Started Free
										</Link>
									</Button>
								) : (
									<Button
										className={`w-full ${
											plan.popular
												? "bg-blue-600 text-white hover:bg-blue-700"
												: "bg-white text-black hover:bg-gray-800 dark:hover:bg-gray-300 hover:text-white dark:hover:text-black"
										}`}
										asChild
									>
										<Link
											href={getCheckoutUrl(
												plan.id,
												isYearly ? "yearly" : "monthly"
											)}
										>
											{plan.popular
												? "Start Free Trial"
												: "Get Started"}
										</Link>
									</Button>
								)}

								<div className="space-y-3">
									<h4 className="font-semibold text-sm text-gray-900 dark:text-gray-300">
										What&apos;s included:
									</h4>
									{plan.features.map((feature, index) => (
										<div
											key={index}
											className="flex items-start gap-3 text-sm"
										>
											<Check className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
											<span className="text-gray-700 dark:text-gray-500">
												{feature}
											</span>
										</div>
									))}
								</div>

								{plan.limitations.length > 0 && (
									<div className="space-y-2 pt-4 border-t border-gray-100 dark:border-neutral-700">
										<h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400">
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

				{/* Trust Indicators */}
				<div className="mt-16 text-center">
					<div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-500">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-green-500 dark:text-green-400 rounded-full"></div>
							<span>30-day money-back guarantee</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-blue-500 dark:text-blue-400 rounded-full"></div>
							<span>Cancel anytime</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-purple-500 dark:text-purple-400 rounded-full"></div>
							<span>Secure payment</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
