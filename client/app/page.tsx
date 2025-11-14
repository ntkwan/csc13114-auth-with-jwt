"use client";

import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isAuthenticated ? `Welcome back, ${user?.email}!` : 'Welcome to JWT Auth System'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {isAuthenticated 
                ? 'You are successfully authenticated with JWT tokens.'
                : 'A complete authentication system with JWT access and refresh tokens.'
              }
            </p>
            
            {!isAuthenticated && (
              <div className="flex gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg">Sign up</Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Login
                  </Button>
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="flex gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>JWT Authentication</CardTitle>
                <CardDescription>
                  Secure access and refresh token implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Uses JWT access tokens (15min) and refresh tokens (7 days) for secure authentication.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>React Query</CardTitle>
                <CardDescription>
                  Efficient server state management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Handles authentication mutations and data fetching with automatic caching and synchronization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>React Hook Form</CardTitle>
                <CardDescription>
                  Form validation and handling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Provides robust form validation with real-time error feedback and type safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

