/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Shield,
  Settings,
  Activity,
  FileText,
  BarChart3,
  Crown,
  User,
} from "lucide-react";
import { RoleAuthService, type UserRole } from "@/lib/auth/role-auth";
import { supabase } from "@/lib/supabase/auth";

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Activity className="h-4 w-4" />,
    roles: ["user", "premium_user", "moderator", "admin"],
  },
  {
    label: "Resumes",
    href: "/resumes",
    icon: <FileText className="h-4 w-4" />,
    roles: ["user", "premium_user", "moderator", "admin"],
  },
  {
    label: "Premium Templates",
    href: "/premium/templates",
    icon: <Crown className="h-4 w-4" />,
    roles: ["premium_user", "moderator", "admin"],
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    roles: ["premium_user", "moderator", "admin"],
  },
  {
    label: "Content Moderation",
    href: "/moderator/content",
    icon: <Settings className="h-4 w-4" />,
    roles: ["moderator", "admin"],
  },
  {
    label: "User Management",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
    roles: ["admin"],
  },
  {
    label: "Admin Dashboard",
    href: "/admin",
    icon: <Shield className="h-4 w-4" />,
    roles: ["admin"],
  },
];

export function RoleBasedNavigation() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);

      if (user) {
        const role = await RoleAuthService.getUserRole(user.id);
        setUserRole(role);
      }
    } catch (error) {
      console.error("Error getting current user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getAccessibleItems = () => {
    if (!userRole) return [];
    return navigationItems.filter((item) => item.roles.includes(userRole));
  };

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "moderator":
        return "Moderator";
      case "premium_user":
        return "Premium User";
      default:
        return "User";
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "text-red-600";
      case "moderator":
        return "text-orange-600";
      case "premium_user":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return null;
  }

  const accessibleItems = getAccessibleItems();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">ResumeAI</h1>
            </Link>

            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {accessibleItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300"
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {currentUser.email?.split("@")[0] || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{currentUser.email}</span>
                    <span className={`text-sm ${getRoleColor(userRole!)}`}>
                      {getRoleDisplayName(userRole!)}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {userRole === "admin" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}

                {userRole === "moderator" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/moderator/content"
                        className="flex items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Content Moderation
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}

                {userRole === "premium_user" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/premium/templates"
                        className="flex items-center"
                      >
                        <Crown className="mr-2 h-4 w-4" />
                        Premium Templates
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
