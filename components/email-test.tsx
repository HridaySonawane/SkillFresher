/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, CheckCircle, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function EmailTest() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState({
		signup: false,
		magicLink: false,
		passwordReset: false,
	});
	const [results, setResults] = useState<{
		signup?: { success: boolean; message: string };
		magicLink?: { success: boolean; message: string };
		passwordReset?: { success: boolean; message: string };
	}>({});

	const supabase = createClient();

	const testSignupEmail = async () => {
		if (!email) return;

		setLoading((prev) => ({ ...prev, signup: true }));

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password: "TempPassword123!",
				options: {
					data: {
						full_name: "Test User",
						avatar_url: null,
					},
				},
			});

			if (error) throw error;

			setResults((prev) => ({
				...prev,
				signup: {
					success: true,
					message:
						"✅ Signup email sent successfully! Check your inbox.",
				},
			}));
		} catch (error: any) {
			console.error("Signup error:", error); // Add this line
			setResults((prev) => ({
				...prev,
				signup: {
					success: false,
					message: `❌ Error: ${error.message}`,
				},
			}));
		} finally {
			setLoading((prev) => ({ ...prev, signup: false }));
		}
	};

	const testMagicLink = async () => {
		if (!email) return;

		setLoading((prev) => ({ ...prev, magicLink: true }));

		try {
			const { data, error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					shouldCreateUser: false,
				},
			});

			if (error) throw error;

			setResults((prev) => ({
				...prev,
				magicLink: {
					success: true,
					message:
						"✅ Magic link sent successfully! Check your inbox.",
				},
			}));
		} catch (error: any) {
			setResults((prev) => ({
				...prev,
				magicLink: {
					success: false,
					message: `❌ Error: ${error.message}`,
				},
			}));
		} finally {
			setLoading((prev) => ({ ...prev, magicLink: false }));
		}
	};

	const testPasswordReset = async () => {
		if (!email) return;

		setLoading((prev) => ({ ...prev, passwordReset: true }));

		try {
			const { data, error } = await supabase.auth.resetPasswordForEmail(
				email,
				{
					redirectTo: `${window.location.origin}/auth/reset-password`,
				}
			);

			if (error) throw error;

			setResults((prev) => ({
				...prev,
				passwordReset: {
					success: true,
					message:
						"✅ Password reset email sent successfully! Check your inbox.",
				},
			}));
		} catch (error: any) {
			setResults((prev) => ({
				...prev,
				passwordReset: {
					success: false,
					message: `❌ Error: ${error.message}`,
				},
			}));
		} finally {
			setLoading((prev) => ({ ...prev, passwordReset: false }));
		}
	};

	const clearResults = () => {
		setResults({});
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Mail className="w-5 h-5" />
						Email Configuration Test
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<label
							htmlFor="test-email"
							className="text-sm font-medium"
						>
							Test Email Address
						</label>
						<Input
							id="test-email"
							type="email"
							placeholder="Enter your email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<p className="text-xs text-gray-500">
							Use your own email address to receive test emails
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
						<Button
							onClick={testSignupEmail}
							disabled={loading.signup || !email}
							variant="default"
							className="w-full"
						>
							{loading.signup ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Testing...
								</>
							) : (
								"Test Signup Email"
							)}
						</Button>

						<Button
							onClick={testMagicLink}
							disabled={loading.magicLink || !email}
							variant="outline"
							className="w-full bg-transparent"
						>
							{loading.magicLink ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Testing...
								</>
							) : (
								"Test Magic Link"
							)}
						</Button>

						<Button
							onClick={testPasswordReset}
							disabled={loading.passwordReset || !email}
							variant="outline"
							className="w-full bg-transparent"
						>
							{loading.passwordReset ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Testing...
								</>
							) : (
								"Test Password Reset"
							)}
						</Button>
					</div>

					{Object.keys(results).length > 0 && (
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<h4 className="text-sm font-medium">
									Test Results:
								</h4>
								<Button
									onClick={clearResults}
									variant="ghost"
									size="sm"
								>
									Clear Results
								</Button>
							</div>

							{results.signup && (
								<Alert
									variant={
										results.signup.success
											? "default"
											: "destructive"
									}
								>
									<div className="flex items-center gap-2">
										{results.signup.success ? (
											<CheckCircle className="w-4 h-4 text-green-600" />
										) : (
											<XCircle className="w-4 h-4 text-red-600" />
										)}
										<AlertDescription className="text-sm">
											<strong>Signup Email:</strong>{" "}
											{results.signup.message}
										</AlertDescription>
									</div>
								</Alert>
							)}

							{results.magicLink && (
								<Alert
									variant={
										results.magicLink.success
											? "default"
											: "destructive"
									}
								>
									<div className="flex items-center gap-2">
										{results.magicLink.success ? (
											<CheckCircle className="w-4 h-4 text-green-600" />
										) : (
											<XCircle className="w-4 h-4 text-red-600" />
										)}
										<AlertDescription className="text-sm">
											<strong>Magic Link:</strong>{" "}
											{results.magicLink.message}
										</AlertDescription>
									</div>
								</Alert>
							)}

							{results.passwordReset && (
								<Alert
									variant={
										results.passwordReset.success
											? "default"
											: "destructive"
									}
								>
									<div className="flex items-center gap-2">
										{results.passwordReset.success ? (
											<CheckCircle className="w-4 h-4 text-green-600" />
										) : (
											<XCircle className="w-4 h-4 text-red-600" />
										)}
										<AlertDescription className="text-sm">
											<strong>Password Reset:</strong>{" "}
											{results.passwordReset.message}
										</AlertDescription>
									</div>
								</Alert>
							)}
						</div>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">
						What to Check in Your Email
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4 text-sm">
						<div>
							<h4 className="font-medium mb-2">
								✅ Email Delivery Checklist:
							</h4>
							<ul className="space-y-1 text-gray-600">
								<li>
									• Check your <strong>inbox</strong> for the
									test emails
								</li>
								<li>
									• Check your{" "}
									<strong>spam/junk folder</strong> if not in
									inbox
								</li>
								<li>
									• Verify the <strong>sender name</strong>{" "}
									appears correctly
								</li>
								<li>
									• Verify the <strong>sender email</strong>{" "}
									is correct
								</li>
								<li>
									• Check that email{" "}
									<strong>content/templates</strong> look good
								</li>
								<li>
									• Test clicking the{" "}
									<strong>verification links</strong>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-medium mb-2">
								🔧 If Emails Don&apos;t Arrive:
							</h4>
							<ul className="space-y-1 text-gray-600">
								<li>• Check Supabase SMTP configuration</li>
								<li>
									• Verify sender email domain is set up
									correctly
								</li>
								<li>
									• Check email service (Resend/SendGrid) logs
								</li>
								<li>
									• Ensure DNS records are properly configured
								</li>
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
