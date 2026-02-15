/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getCurrentUserRole,
  getCurrentUserProfileWithRole,
  getRoleDisplayName,
  getRoleColorClass,
  hasRole,
} from "@/lib/auth/user-role-utils";
import type { UserRole } from "@/lib/auth/role-auth";

export function UserRoleExample() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);

      // Get current user's role
      const role = await getCurrentUserRole();
      setUserRole(role);

      // Get current user's full profile
      const profile = await getCurrentUserProfileWithRole();
      setUserProfile(profile);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div>Loading user role...</div>
        </CardContent>
      </Card>
    );
  }

  if (!userRole) {
    return (
      <Card>
        <CardContent className="p-6">
          <div>No user role found. Please sign in.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User Role Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Role */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">Current Role:</span>
            <Badge className={getRoleColorClass(userRole)}>
              {getRoleDisplayName(userRole)}
            </Badge>
          </div>

          {/* Role Hierarchy Check */}
          <div className="space-y-2">
            <h4 className="font-medium">Role Permissions:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div
                className={`p-2 rounded ${hasRole(userRole, "user") ? "bg-green-100" : "bg-gray-100"}`}
              >
                User Access: {hasRole(userRole, "user") ? "✅" : "❌"}
              </div>
              <div
                className={`p-2 rounded ${hasRole(userRole, "premium_user") ? "bg-green-100" : "bg-gray-100"}`}
              >
                Premium Access:{" "}
                {hasRole(userRole, "premium_user") ? "✅" : "❌"}
              </div>
              <div
                className={`p-2 rounded ${hasRole(userRole, "moderator") ? "bg-green-100" : "bg-gray-100"}`}
              >
                Moderator Access: {hasRole(userRole, "moderator") ? "✅" : "❌"}
              </div>
              <div
                className={`p-2 rounded ${hasRole(userRole, "admin") ? "bg-green-100" : "bg-gray-100"}`}
              >
                Admin Access: {hasRole(userRole, "admin") ? "✅" : "❌"}
              </div>
            </div>
          </div>

          {/* User Profile Data */}
          {userProfile && (
            <div className="space-y-2">
              <h4 className="font-medium">User Profile:</h4>
              <div className="text-sm space-y-1">
                <div>
                  <strong>Email:</strong> {userProfile.email}
                </div>
                <div>
                  <strong>Full Name:</strong>{" "}
                  {userProfile.full_name || "Not set"}
                </div>
                <div>
                  <strong>Role:</strong> {getRoleDisplayName(userProfile.role)}
                </div>
                <div>
                  <strong>Subscription Tier:</strong>{" "}
                  {userProfile.subscription_tier}
                </div>
                <div>
                  <strong>Created:</strong>{" "}
                  {new Date(userProfile.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}

          {/* Conditional Content Based on Role */}
          <div className="space-y-2">
            <h4 className="font-medium">Role-Based Content:</h4>

            {hasRole(userRole, "admin") && (
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <strong>Admin Panel:</strong> You have full administrative
                access.
              </div>
            )}

            {hasRole(userRole, "moderator") && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <strong>Moderation Tools:</strong> You can moderate content.
              </div>
            )}

            {hasRole(userRole, "premium_user") && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                <strong>Premium Features:</strong> You have access to premium
                templates and features.
              </div>
            )}

            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <strong>Basic Features:</strong> All users have access to basic
              resume creation.
            </div>
          </div>

          <Button onClick={loadUserData} variant="outline" size="sm">
            Refresh User Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
