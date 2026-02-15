import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function CheckoutHeader() {
	return (
		<header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-neutral-800">
			<div className="max-w-6xl mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Button variant={"link"} asChild>
							<Link
								href="/pricing"
								className="flex items-center gap-2"
							>
								<ArrowLeft className="w-4 h-4" />
								Back to Pricing
							</Link>
						</Button>
						<div className="h-6 w-px bg-gray-300" />
						<h1 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
							Checkout
						</h1>
					</div>

					<div className="flex items-center gap-2">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<span className="text-sm text-gray-600 dark:text-gray-400">
							Secure Checkout
						</span>
					</div>
				</div>
			</div>
		</header>
	);
}
