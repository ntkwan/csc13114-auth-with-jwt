"use client";

import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User, LogOut, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useUserProfile, useLogout } from "@/lib/auth-hooks";
import { ProtectedRoute } from "@/components/protected-route";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoading } = useAuth();
  const { data: user, isLoading: profileLoading, error } = useUserProfile();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          {(isLoading || profileLoading) ? (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">Loading...</div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Dashboard
                  </CardTitle>
                  <CardDescription>
                    Welcome to your protected dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Failed to load user profile. Please try refreshing the page.
                      </AlertDescription>
                    </Alert>
                  )}

                  {user && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">User Information</h3>
                        <div className="mt-2 space-y-2">
                          <p><span className="font-medium">ID:</span> {user.id}</p>
                          <p><span className="font-medium">Email:</span> {user.email}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button 
                          onClick={handleLogout} 
                          variant="outline" 
                          className="flex items-center gap-2"
                          disabled={logoutMutation.isPending}
                        >
                          <LogOut className="h-4 w-4" />
                          {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
