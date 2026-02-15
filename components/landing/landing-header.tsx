"use client";

import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../themeChanger";
// Removed framer-motion imports
// import { motion, AnimatePresence, useAnimation } from "framer-motion";

export function LandingHeader() {
	// Removed animation-related state
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	// const [isHovered, setIsHovered] = useState(false);
	// const [expanded, setExpanded] = useState(false);

	// Removed animation controls
	// const svgControls = useAnimation();
	// const contentControls = useAnimation();

	// Removed useEffect for animation
	// useEffect(() => { ... }, [isHovered]);

	// Always show expanded content (no hover/animation logic)
	const navLinks = [
		{ href: "#features", label: "Features" },
		{ href: "./templete", label: "Templates" },
		{ href: "./pricing", label: "Pricing" },
		{ href: "#about", label: "About" },
	];

	return (
		<>
			{/* Donation Banner */}
			<div className="bg-gray-900 dark:bg-gray-950/70 text-white text-sm py-2 px-4 text-center">
				<div className="flex items-center justify-center gap-2">
					<Heart className="w-4 h-4 text-red-400" />
					<span>
						If this project has helped you, please consider
						supporting us as we&apos;re building the future of
						AI-powered resume creation.
					</span>
				</div>
			</div>

			<div className="w-full flex justify-center items-center">
				<header className="bg-white/60 px-2 sm:px-4 md:px-6 dark:bg-gray-950/60 backdrop-blur-lg border-2 border-neutral-600/25 dark:border-2 dark:border-neutral-300/25 fixed top-2 sm:top-4 md:top-6 z-50 py-2 sm:py-3 rounded-2xl shadow-md shadow-neutral-300/20 dark:shadow-gray-800/50 flex items-center w-[98vw] max-w-5xl mx-auto">
					{/* Logo Text (AI) */}
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">AI</span>
							</div>
						</div>
					</div>
					{/* Header Content */}
					<div className="flex-1 flex justify-between items-center gap-4 sm:gap-8 h-14 ml-2 sm:ml-4">
						<div className="flex items-center">
							<div className="ml-2 sm:ml-3">
								<h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-300">SkillFresher</h1>
								<p className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Resume Builder</p>
							</div>
						</div>
						{/* Desktop Nav */}
						<nav className="hidden md:flex space-x-6 lg:space-x-8">
							{navLinks.map((link) => (
								<a key={link.href} href={link.href} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
									{link.label}
								</a>
							))}
						</nav>
						<div className="hidden md:flex items-center space-x-2 sm:space-x-4">
							<Button className="dark:bg-gray-800/85" variant="secondary" asChild>
								<a href="/auth/signin">Sign In</a>
							</Button>
							<Button asChild>
								<a href="/auth/signup">Get Started</a>
							</Button>
							<ModeToggle />
						</div>
						{/* Mobile Menu Button */}
						<div className="md:hidden">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								aria-label="Toggle menu"
							>
								{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
							</Button>
						</div>
					</div>
				</header>
				{/* Mobile Menu Overlay */}
				{mobileMenuOpen && (
					<div className="fixed inset-0 z-40 bg-black/40 flex flex-col items-center pt-24">
						<div className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg w-[90vw] max-w-xs mx-auto p-6 flex flex-col gap-4">
							{navLinks.map((link) => (
								<a key={link.href} href={link.href} className="text-gray-700 dark:text-gray-300 text-lg py-2 px-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors text-center">
									{link.label}
								</a>
							))}
							<Button className="w-full dark:bg-gray-800/85" variant="secondary" asChild>
								<a href="/auth/signin">Sign In</a>
							</Button>
							<Button className="w-full" asChild>
								<a href="/auth/signup">Get Started</a>
							</Button>
							<div className="flex justify-center mt-2"><ModeToggle /></div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
