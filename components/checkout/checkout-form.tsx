/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, User, Lock, CreditCard } from "lucide-react";
import { getStripe } from "@/lib/stripe/stripe-client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface PlanDetails {
	id: string;
	name: string;
	price: number;
	interval: string;
	priceId: string;
	features: string[];
}

interface CheckoutFormProps {
	plan: PlanDetails;
	onStepChange: (step: number) => void;
}

export function CheckoutForm({ plan, onStepChange }: CheckoutFormProps) {
	const [currentStep, setCurrentStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		firstName: "",
		lastName: "",
		agreeToTerms: false,
		subscribeNewsletter: true,
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateStep1 = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
		}
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
		}
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validateStep2 = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}
		if (!formData.agreeToTerms) {
			newErrors.agreeToTerms =
				"You must agree to the terms and conditions";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNextStep = async () => {
		if (currentStep === 1 && validateStep1()) {
			setCurrentStep(2);
			onStepChange(2);
		} else if (currentStep === 2 && validateStep2()) {
			// Sign up the user before proceeding to payment
			const signupSuccess = await handleSignup();
			if (signupSuccess) {
				setCurrentStep(3);
				onStepChange(3);
			}
		}
	};

	const handlePrevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
			onStepChange(currentStep - 1);
		}
	};

	const handleCheckout = async () => {
		setLoading(true);

		try {
			// Create checkout session
			const response = await fetch("/api/stripe/create-checkout", {
				method: "POST",
				credentials: "include",
				// Ensure cookies are sent with the request
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					priceId: plan.priceId,
					customerData: {
						email: formData.email,
						name: `${formData.firstName} ${formData.lastName}`,
					},
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create checkout session");
			}

			const { sessionId } = await response.json();

			// Redirect to Stripe Checkout
			const stripe = await getStripe();
			const { error } = await stripe!.redirectToCheckout({ sessionId });

			if (error) {
				throw error;
			}
		} catch (error: any) {
			console.error("Checkout error:", error);
			setErrors({
				general:
					error.message || "Something went wrong. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};

	const supabase = createClientComponentClient();

	const handleSignup = async () => {
		const { email, password } = formData;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			setErrors({ general: error.message });
			return false;
		}
		return true;
	};

	const firstNameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (currentStep === 1 && firstNameRef.current) {
			firstNameRef.current.focus();
		} else if (currentStep === 2) {
			const passwordInput = document.getElementById(
				"password"
			) as HTMLInputElement;
			if (passwordInput) {
				passwordInput.focus();
			}
		}
	}, [currentStep]);

	return (
		<Card className="max-w-lg min-h-fit flex flex-col justify-evenly mx-auto p-6">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{currentStep === 1 && <User className="w-5 h-5" />}
					{currentStep === 2 && <Lock className="w-5 h-5" />}
					{currentStep === 3 && <CreditCard className="w-5 h-5" />}
					{currentStep === 1 && "Personal Information"}
					{currentStep === 2 && "Account Security"}
					{currentStep === 3 && "Payment"}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Step 1: Personal Information */}
				{currentStep === 1 && (
					<div className="space-y-4">
						<div className="flex flex-col justify-around items-center gap-4">
							<div className="text-center w-full space-y-2.5">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									ref={firstNameRef}
									value={formData.firstName}
									onChange={(e) =>
										handleInputChange(
											"firstName",
											e.target.value
										)
									}
									className={
										errors.firstName ? "border-red-500" : ""
									}
								/>
								{errors.firstName && (
									<p className="text-sm text-red-600 mt-1">
										{errors.firstName}
									</p>
								)}
							</div>
							<div className="text-center w-full space-y-2.5">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									value={formData.lastName}
									onChange={(e) =>
										handleInputChange(
											"lastName",
											e.target.value
										)
									}
									className={
										errors.lastName ? "border-red-500" : ""
									}
								/>
								{errors.lastName && (
									<p className="text-sm text-red-600 mt-1">
										{errors.lastName}
									</p>
								)}
							</div>
						</div>

						<div className="text-center w-full space-y-2.5">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) =>
									handleInputChange("email", e.target.value)
								}
								className={errors.email ? "border-red-500" : ""}
							/>
							{errors.email && (
								<p className="text-sm text-red-600 mt-1">
									{errors.email}
								</p>
							)}
						</div>

						<div className="flex justify-end">
							<Button onClick={handleNextStep}>Continue</Button>
						</div>
					</div>
				)}

				{/* Step 2: Account Security */}
				{currentStep === 2 && (
					<div className="space-y-4">
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={formData.password}
								onChange={(e) =>
									handleInputChange(
										"password",
										e.target.value
									)
								}
								className={
									errors.password ? "border-red-500" : ""
								}
							/>
							{errors.password && (
								<p className="text-sm text-red-600 mt-1">
									{errors.password}
								</p>
							)}
							<p className="text-xs text-gray-500 mt-1">
								Must be at least 8 characters long
							</p>
						</div>

						<div>
							<Label htmlFor="confirmPassword">
								Confirm Password
							</Label>
							<Input
								id="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								onChange={(e) =>
									handleInputChange(
										"confirmPassword",
										e.target.value
									)
								}
								className={
									errors.confirmPassword
										? "border-red-500"
										: ""
								}
							/>
							{errors.confirmPassword && (
								<p className="text-sm text-red-600 mt-1">
									{errors.confirmPassword}
								</p>
							)}
						</div>

						<div className="space-y-3">
							<div className="flex items-center space-x-2">
								<Checkbox
									id="agreeToTerms"
									checked={formData.agreeToTerms}
									onCheckedChange={(checked) =>
										handleInputChange(
											"agreeToTerms",
											checked as boolean
										)
									}
								/>
								<Label
									htmlFor="agreeToTerms"
									className="text-sm"
								>
									I agree to the{" "}
									<a
										href="/terms"
										className="text-blue-600 hover:underline"
									>
										Terms of Service
									</a>{" "}
									and{" "}
									<a
										href="/privacy"
										className="text-blue-600 hover:underline"
									>
										Privacy Policy
									</a>
								</Label>
							</div>
							{errors.agreeToTerms && (
								<p className="text-sm text-red-600">
									{errors.agreeToTerms}
								</p>
							)}

							<div className="flex items-center space-x-2">
								<Checkbox
									id="subscribeNewsletter"
									checked={formData.subscribeNewsletter}
									onCheckedChange={(checked) =>
										handleInputChange(
											"subscribeNewsletter",
											checked as boolean
										)
									}
								/>
								<Label
									htmlFor="subscribeNewsletter"
									className="text-sm"
								>
									Subscribe to our newsletter for tips and
									updates
								</Label>
							</div>
						</div>

						<div className="flex justify-between">
							<Button variant="outline" onClick={handlePrevStep}>
								Back
							</Button>
							<Button onClick={handleNextStep}>
								Continue to Payment
							</Button>
						</div>
					</div>
				)}

				{/* Step 3: Payment */}
				{currentStep === 3 && (
					<div className="space-y-6">
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<h3 className="font-medium text-blue-900 mb-2">
								Ready to Complete Your Purchase
							</h3>
							<p className="text-sm text-blue-800">
								You&apos;ll be redirected to Stripe&apos;s secure payment
								page to complete your subscription to the{" "}
								<strong>{plan.name} plan</strong> for{" "}
								<strong>
									${plan.price}/{plan.interval}
								</strong>
								.
							</p>
						</div>

						<div className="bg-gray-50 rounded-lg p-4">
							<h4 className="font-medium text-gray-900 mb-2">
								Account Summary
							</h4>
							<div className="space-y-1 text-sm text-gray-600">
								<div>
									Name: {formData.firstName}{" "}
									{formData.lastName}
								</div>
								<div>Email: {formData.email}</div>
								<div>
									Plan: {plan.name} (${plan.price}/
									{plan.interval})
								</div>
							</div>
						</div>

						{errors.general && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-4">
								<p className="text-sm text-red-800">
									{errors.general}
								</p>
							</div>
						)}

						<div className="flex justify-between">
							<Button
								variant="outline"
								onClick={handlePrevStep}
								disabled={loading}
							>
								Back
							</Button>
							<Button
								onClick={handleCheckout}
								disabled={loading}
								className="bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white"
							>
								{loading ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Processing...
									</>
								) : (
									`Complete Purchase - $${plan.price}`
								)}
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
