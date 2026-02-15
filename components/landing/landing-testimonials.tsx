"use client";


export function LandingTestimonial() {
	const testimonials = {
		section1: [
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
		],
		section2: [
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
		],
		section3: [
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
			{
				desc: "“This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!”",
				name: "N. Elnour",
			},
		],
	};

	// const sliderVariant = {
	// 	initial: {
	// 		x: "50%",
	// 	},
	// 	animate: {
	// 		x: "-220%",
	// 		transition: {
	// 			duration: 50,
	// 			repeat: Infinity,
	// 			repeatType: "mirror" as const,
	// 		},
	// 	},
	// };

	return (
		<section id="pricing" className="py-12 px-4 sm:px-8 md:px-16 lg:px-20">
			<div className="container h-full flex flex-col">
				<div className="flex-1/5 flex flex-col items-center justify-center">
					<div className="max-w-[45rem] flex flex-col items-center">
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">
							Testimonials
						</h2>
						<p className="text-center text-xs sm:text-sm italic text-gray-600 dark:text-gray-400">
							We always love to hear from the users of Reactive
							Resume with feedback or support. Here are some of
							the messages we&apos;ve received. If you have any
							feedback, feel free to drop us an email at
							hello@amruthpillai.com.
						</p>
					</div>
				</div>
				<div className="flex-4/5 h-full flex flex-col md:grid-cols-2 lg:grid lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-10">
					<div className="contents lg:grid lg:grid-cols-1 lg:grid-rows-7 lg:grid-flow-col gap-4 sm:gap-8 md:gap-10">
						{testimonials.section1.map((testimonial, i) => (
							<div
								key={i}
								className={`bg-card dark:bg-neutral-800/60 rounded-lg ${i === 1 ? "row-span-3" : "row-span-2"}`}
							>
								<div className="p-4 sm:p-6">
									<h2 className="text-sm sm:text-base">
										{testimonial.desc}
									</h2>
									<p className="text-xs sm:text-sm mt-2">
										{testimonial.name}
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="contents lg:grid grid-cols-1 grid-rows-10 grid-flow-col gap-4 sm:gap-8 md:gap-10 pt-2 sm:pt-4">
						{testimonials.section2.map((testimonial, i) => (
							<div
								key={i}
								className="bg-card dark:bg-neutral-800/60 rounded-lg row-span-4"
							>
								<div className="p-4 sm:p-6">
									<h2 className="text-sm sm:text-base">
										{testimonial.desc}
									</h2>
									<p className="text-xs sm:text-sm mt-2">
										{testimonial.name}
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="contents lg:grid grid-cols-1 grid-rows-7 grid-flow-col gap-4 sm:gap-8 md:gap-10">
						{testimonials.section1.map((testimonial, i) => (
							<div
								key={i}
								className={`bg-card dark:bg-neutral-800/60 rounded-lg ${i === 1 ? "row-span-3" : "row-span-2"}`}
							>
								<div className="p-4 sm:p-6">
									<h2 className="text-sm sm:text-base">
										{testimonial.desc}
									</h2>
									<p className="text-xs sm:text-sm mt-2">
										{testimonial.name}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
