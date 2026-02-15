/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Users, Shield, Settings, Activity } from "lucide-react";
import { RoleAuthService, type UserRole } from "@/lib/auth/role-auth";
import { supabase } from "@/lib/supabase/auth";
import { DashboardHeader } from "../dashboard/dashboard-header";

interface User {
	id: string;
	email: string;
	full_name: string | null;
	role: UserRole;
	created_at: string;
}

export function AdminDashboard() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [currentUser, setCurrentUser] = useState<any>(null);

	useEffect(() => {
		loadUsers();
		getCurrentUser();
	}, []);

	const getCurrentUser = async () => {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setCurrentUser(session?.user || null);
			console.log("Current user:", session?.user);
		} catch (error) {
			console.error("Error getting current user:", error);
		}
	};

	const loadUsers = async () => {
		try {
			setLoading(true);
			if (!currentUser) return;

			const usersData = await RoleAuthService.getAllUsersWithRoles(
				currentUser.id
			);
			setUsers(usersData);
		} catch (error: any) {
			setError(error.message || "Failed to load users");
		} finally {
			setLoading(false);
		}
	};

	const updateUserRole = async (userId: string, newRole: UserRole) => {
		try {
			if (!currentUser) return;

			const success = await RoleAuthService.updateUserRole(
				currentUser.id,
				userId,
				newRole
			);
			if (success) {
				// Update the local state
				setUsers((prev) =>
					prev.map((user) =>
						user.id === userId ? { ...user, role: newRole } : user
					)
				);
			} else {
				setError("Failed to update user role");
			}
		} catch (error: any) {
			setError(error.message || "Failed to update user role");
		}
	};

	const getRoleColor = (role: UserRole) => {
		switch (role) {
			case "admin":
				return "bg-red-100 text-red-800";
			case "moderator":
				return "bg-orange-100 text-orange-800";
			case "premium_user":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStats = () => {
		const totalUsers = users.length;
		const adminUsers = users.filter((u) => u.role === "admin").length;
		const moderatorUsers = users.filter(
			(u) => u.role === "moderator"
		).length;
		const premiumUsers = users.filter(
			(u) => u.role === "premium_user"
		).length;
		const regularUsers = users.filter((u) => u.role === "user").length;

		return {
			totalUsers,
			adminUsers,
			moderatorUsers,
			premiumUsers,
			regularUsers,
		};
	};

	const stats = getStats();

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<Loader2 className="w-8 h-8 animate-spin" />
			</div>
		);
	}

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="space-y-6">
			{/* <div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Admin Dashboard</h1>
				<Button onClick={loadUsers} variant="outline">
					Refresh
				</Button>
			</div> */}

			<DashboardHeader />

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Users
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.totalUsers}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Admins
						</CardTitle>
						<Shield className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.adminUsers}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Moderators
						</CardTitle>
						<Settings className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.moderatorUsers}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Premium Users
						</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.premiumUsers}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Regular Users
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.regularUsers}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Users Table */}
			<Card>
				<CardHeader>
					<CardTitle>User Management</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Joined</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id}>
									<TableCell>
										<div className="font-medium">
											{user.full_name || "No name"}
										</div>
									</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										<Badge
											className={getRoleColor(user.role)}
										>
											{user.role}
										</Badge>
									</TableCell>
									<TableCell>
										{new Date(
											user.created_at
										).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<Select
											value={user.role}
											onValueChange={(value: UserRole) =>
												updateUserRole(user.id, value)
											}
										>
											<SelectTrigger className="w-32">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="user">
													User
												</SelectItem>
												<SelectItem value="premium_user">
													Premium
												</SelectItem>
												<SelectItem value="moderator">
													Moderator
												</SelectItem>
												<SelectItem value="admin">
													Admin
												</SelectItem>
											</SelectContent>
										</Select>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
