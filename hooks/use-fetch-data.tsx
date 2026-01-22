import api from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";

const useFetchData = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true); // Start loading true to avoid flash? Original was false then true in effect.
  const [error, setError] = useState<string | null>(null);

  // TODO : callback
  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = (await api.get(url)).data;

      const data = response.payload;

      setData(data);
    } catch (error) {
      let message = "Error Occured";

      if (error instanceof Error) {
        message = error.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    fetching: loading,
    fetchData: data,
    fetchError: error,
    refetch: fetch,
  };
};

export default useFetchData;
