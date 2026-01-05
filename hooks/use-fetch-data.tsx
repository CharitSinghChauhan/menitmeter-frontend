import api from "@/lib/axios";
import { useEffect, useState } from "react";

const useFetchData = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      setData(null);

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
    })();
  }, [url]);

  return { fetching: loading, fetchData: data, fetchError: error };
};

export default useFetchData;
