import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts error message from various error types (axios errors, generic errors, etc.)
 * @param error - The error object from API calls or mutations
 * @param fallbackMessage - Default message if no specific error message is found
 * @returns The extracted error message
 */
export function getErrorMessage(error: any, fallbackMessage: string = "An error occurred"): string {
  // Try to get message from axios error response
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  // Try to get message from error object
  if (error?.message) {
    return error.message;
  }
  
  // Try to get message from nested error
  if (error?.error?.message) {
    return error.error.message;
  }
  
  // Return fallback message
  return fallbackMessage;
}

