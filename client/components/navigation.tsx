"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Button } from "./ui/button";
import { useLogout } from "@/lib/auth-hooks";

export function Navigation() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  const logoutMutation = useLogout();

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign up" },
  ];

  const authenticatedLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const links = isAuthenticated ? authenticatedLinks : publicLinks;

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Auth system
            </Link>
            <div className="flex space-x-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email || 'User'}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

