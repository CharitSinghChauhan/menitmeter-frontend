import api from "@/lib/axios";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  payload: T;
}

interface RequestOptions {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const postRequest = async <T = unknown>(
  url: string,
  data: unknown,
  options: RequestOptions = { showToast: true }
): Promise<T | null> => {
  try {
    const response = await api.post<ApiResponse<T>>(url, data);
    const { payload, success, message } = response.data;

    if (!success) {
      if (options.showToast) {
        toast.error(options.errorMessage || message || "Operation failed");
      }
      return null;
    }

    if (options.showToast) {
      toast.success(options.successMessage || message || "Success!");
    }
    return payload;
  } catch (error: unknown) {
    let message = "An unexpected error occurred. Please try again.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    if (options.showToast) {
      toast.error(options.errorMessage || message);
    }

    console.error(`POST request failed [${url}]:`, error);
    return null;
  }
};
 
 // TODO : Learn :: generic unknown, null why ??
export function usePostRequest<T = unknown>() {
  const [isPending, setIsPending] = useState(false);

  const execute = async (
    url: string,
    data: unknown,
    options: RequestOptions = { showToast: true }
  ): Promise<T | null> => {
    setIsPending(true);
    try {
      return await postRequest<T>(url, data, options);
    } finally {
      setIsPending(false);
    }
  };

  return { execute, isPending };
}
