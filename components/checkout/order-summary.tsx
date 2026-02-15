import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, CreditCard, Zap } from "lucide-react";

interface PlanDetails {
	id: string;
	name: string;
	price: number;
	interval: string;
	priceId: string;
	features: string[];
}

interface OrderSummaryProps {
	plan: PlanDetails;
}

export function OrderSummary({ plan }: OrderSummaryProps) {
	const isYearly = plan.interval === "year";
	const monthlyEquivalent = isYearly ? (plan.price / 12).toFixed(2) : null;
	const savings = isYearly
		? (plan.price * 1.2 - plan.price).toFixed(2)
		: null;

	return (
		<div className="space-y-3">
			{/* Order Summary Card */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Zap className="w-5 h-5 text-blue-600" />
						Order Summary
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium text-gray-900 dark:text-gray-300">
								{plan.name} Plan
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Billed {plan.interval}ly
								{monthlyEquivalent && (
									<span className="ml-1">
										(${monthlyEquivalent}/month)
									</span>
								)}
							</p>
						</div>
						<div className="text-right">
							<div className="font-semibold text-gray-900 dark:text-gray-300">
								${plan.price}
							</div>
							{isYearly && (
								<Badge
									variant="secondary"
									className="bg-green-100 text-green-800 text-xs"
								>
									Save ${savings}
								</Badge>
							)}
						</div>
					</div>

					<div className="border-t pt-4">
						<div className="flex items-center justify-between font-semibold text-lg">
							<span>Total</span>
							<span>${plan.price}</span>
						</div>
						<p className="text-xs text-gray-500 mt-1">
							Includes all taxes and fees
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Features Card */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">What&apos;s Included</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-3">
						{plan.features.map((feature, index) => (
							<li key={index} className="flex items-start gap-3">
								<Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
								<span className="text-sm text-gray-700 dark:text-gray-500">
									{feature}
								</span>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>

			{/* Security Card */}
			<Card className="bg-blue-50 border-blue-200">
				<CardHeader>
					<div className="flex items-center gap-3 text-lg">
						<Shield className="w-5 h-5 text-blue-600" />
						<span className="font-medium text-blue-900">
							Secure Payment
						</span>
					</div>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2 text-sm text-blue-800">
						<li className="flex items-center gap-2">
							<CreditCard className="w-4 h-4" />
							256-bit SSL encryption
						</li>
						<li className="flex items-center gap-2">
							<Shield className="w-4 h-4" />
							PCI DSS compliant
						</li>
						<li className="flex items-center gap-2">
							<Check className="w-4 h-4" />
							30-day money-back guarantee
						</li>
					</ul>
				</CardContent>
			</Card>

			{/* Support Card */}
			<Card className="bg-gray-50">
				<CardContent className="text-center">
					<h3 className="font-medium text-gray-900 mb-2">
						Need Help?
					</h3>
					<p className="text-sm text-gray-600 mb-3">
						Our support team is here to help you get started.
					</p>
					<div className="space-y-2 text-sm">
						<div>
							<span className="text-gray-500">Email:</span>{" "}
							<a
								href="mailto:support@resumebuilder.ai"
								className="text-blue-600 hover:underline"
							>
								support@resumebuilder.ai
							</a>
						</div>
						<div>
							<span className="text-gray-500">Live Chat:</span>{" "}
							<span className="text-green-600">
								Available 24/7
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
