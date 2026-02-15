import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
	{
		name: "Sarah Johnson",
		role: "Software Engineer",
		company: "Google",
		image: "/placeholder.svg?height=60&width=60",
		rating: 5,
		text: "ResumeAI helped me land my dream job at Google. The AI optimization feature made my resume stand out from hundreds of other applications.",
	},
	{
		name: "Michael Chen",
		role: "Marketing Director",
		company: "Spotify",
		image: "/placeholder.svg?height=60&width=60",
		rating: 5,
		text: "The premium templates are absolutely gorgeous. I got 3x more interview calls after switching to ResumeAI. Worth every penny!",
	},
	{
		name: "Emily Rodriguez",
		role: "Product Manager",
		company: "Airbnb",
		image: "/placeholder.svg?height=60&width=60",
		rating: 5,
		text: "As someone who reviews hundreds of resumes, I can say ResumeAI creates resumes that actually get noticed. The ATS optimization is spot-on.",
	},
];

export function PricingTestimonials() {
	return (
		<div className="py-16 dark:bg-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-4">
						Loved by job seekers worldwide
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-400">
						Join thousands of professionals who landed their dream
						jobs
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<Card
							key={index}
							className="border-0 shadow-lg dark:bg-transparent/70 dark:backdrop-blur-md dark:inset-ring-2 dark:inset-ring-neutral-500/30 transition-shadow duration-300"
						>
							<CardContent className="p-6">
								<div className="flex items-center gap-1 mb-4">
									{[...Array(testimonial.rating)].map(
										(_, i) => (
											<Star
												key={i}
												className="w-4 h-4 fill-yellow-400 text-yellow-400"
											/>
										)
									)}
								</div>

								<p className="text-gray-700 dark:text-gray-500 mb-6 italic">
									&quot;{testimonial.text}&quot;
								</p>

								<div className="flex items-center gap-3">
									<Image
										src={
											testimonial.image ||
											"/placeholder.svg"
										}
										alt={testimonial.name}
										width={48}
										height={48}
										className="rounded-full"
									/>
									<div>
										<div className="font-semibold text-gray-900 dark:text-gray-300">
											{testimonial.name}
										</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">
											{testimonial.role} at{" "}
											{testimonial.company}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
