"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

const faqs = [
	{
		question: "Can I cancel my subscription anytime?",
		answer: "Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of your current billing period, and you won't be charged again.",
	},
	{
		question: "Do you offer refunds?",
		answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service within the first 30 days, contact us for a full refund.",
	},
	{
		question: "What payment methods do you accept?",
		answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through Stripe.",
	},
	{
		question: "Can I upgrade or downgrade my plan?",
		answer: "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference immediately. When downgrading, the change takes effect at your next billing cycle.",
	},
	{
		question: "Is there a free trial for paid plans?",
		answer: "We don't offer free trials, but we do have a generous free plan that lets you create 1 resume and try our basic features. You can upgrade anytime if you need more features.",
	},
	{
		question: "What happens to my resumes if I cancel?",
		answer: "Your resumes remain accessible for 30 days after cancellation. During this time, you can export them or reactivate your subscription. After 30 days, your account will be archived.",
	},
	{
		question: "Do you offer discounts for students or nonprofits?",
		answer: "Yes! We offer 50% discounts for students with valid .edu email addresses and qualified nonprofit organizations. Contact our support team to apply.",
	},
	{
		question: "How does the AI optimization work?",
		answer: "Our AI analyzes your resume content, job descriptions, and industry standards to suggest improvements for better ATS compatibility and recruiter appeal. It's like having a professional resume writer review your resume.",
	},
];

export function PricingFAQ() {
	return (
		<div className="py-16 bg-gray-50 dark:bg-gradient-to-t from-gray-900 to-gray-950">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-4">
						Frequently asked questions
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-400">
						Everything you need to know about our pricing and plans
					</p>
				</div>

				<div className="space-y-2">
					{faqs.map((faq, index) => (
						// <Card
						// 	key={index}
						// 	className="border-0 shadow-sm dark:bg-transparent/70 dark:backdrop-blur-md dark:inset-ring-1 dark:inset-ring-gray-800/70 dark:rounded-lg transition-shadow duration-300"
						// >
						// 	<CardContent className="p-0">
						// 		<button
						// 			className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-transparent transition-colors"
						// 			onClick={() => toggleFAQ(index)}
						// 		>
						// 			<span className="font-semibold text-gray-900 dark:text-gray-300 pr-4">
						// 				{faq.question}
						// 			</span>
						// 			{openIndex === index ? (
						// 				<ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300 flex-shrink-0" />
						// 			) : (
						// 				<ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300 flex-shrink-0" />
						// 			)}
						// 		</button>

						// 		{openIndex === index && (
						// 			<div className="px-6 pb-4">
						// 				<p className="text-gray-700 dark:text-gray-500 leading-relaxed">
						// 					{faq.answer}
						// 				</p>
						// 			</div>
						// 		)}
						// 	</CardContent>
						// </Card>
						<Accordion
							className="border-0 shadow-sm dark:bg-transparent/70 dark:backdrop-blur-md dark:border-b dark:border-gray-800 transition-shadow duration-300"
							key={index}
							type="single"
							collapsible
						>
							<AccordionItem value="item-1">
								<AccordionTrigger>
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>

				<div className="text-center mt-12">
					<p className="text-gray-600 dark:text-gray-400 mb-4">
						Still have questions?
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="mailto:support@resumeai.com"
							className="text-blue-600 dark:text-blue-500 hover:underline"
						>
							Email Support
						</a>
						<a
							href="/contact"
							className="text-blue-600 dark:text-blue-500 hover:underline"
						>
							Contact Us
						</a>
						<a
							href="/help"
							className="text-blue-600 dark:text-blue-500 hover:underline"
						>
							Help Center
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
