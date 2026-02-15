import { PricingHeader } from "@/components/pricing/pricing-header";
import { PricingFAQ } from "@/components/pricing/pricing-faq";
import { PricingComparison } from "@/components/pricing/pricing-comparison";
import { PricingTestimonials } from "@/components/pricing/pricing-testimonials";
import { PricingPlansWithCheckout } from "@/components/pricing/pricing-plans-with-checkout";

export default function PricingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:bg-gray-950">
			<PricingHeader />
			<PricingPlansWithCheckout />
			<PricingComparison />
			<PricingTestimonials />
			<PricingFAQ />
		</div>
	);
}
