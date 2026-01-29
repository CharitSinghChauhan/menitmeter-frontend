import api from "@/lib/axios";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface RequestOptions {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const postRequest = async (
  url: string,
  data?: unknown,
  options: RequestOptions = { showToast: true }
): Promise<{
  success: boolean;
  payload: any;
  message: string;
}> => {
  try {
    console.log("data inside the postRequest", data);

    const response = (await api.post(url, data)).data;
    
    const { payload, success, message } = response;

    if (!success) {
      if (options.showToast) {
        toast.error(options.errorMessage || message || "Operation failed");
      }
      return { payload, success, message };
    }

    if (options.showToast) {
      toast.success(options.successMessage || message || "Success!");
    }
    return { payload, success, message };
  } catch (error: unknown) {
    let message = "An unexpected error occurred. Please try again.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    if (options.showToast) {
      toast.error(options.errorMessage || message);
    }

    console.error(`POST request failed [${url}]:`, error);
    return { payload: null, success: false, message };
  }
};

// TODO : Learn :: generic unknown, null why ??
export function usePostRequest() {
  const [isPending, setIsPending] = useState(false);

  const execute = async (
    url: string,
    data?: unknown,
    options: RequestOptions = { showToast: true }
  ) => {
    setIsPending(true);
    try {
      return await postRequest(url, data, options);
    } finally {
      setIsPending(false);
    }
  };

  return { execute, isPending };
}
