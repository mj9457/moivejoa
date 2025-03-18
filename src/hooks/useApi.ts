import { useState, useCallback } from "react";
import apiClient from "@/lib/apiClient";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiCallParams<T> {
  url: string;
  method?: HttpMethod;
  data?: T;
}

const useApi = <T, U = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async ({ url, method = "GET", data: body }: ApiCallParams<U>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient({
          url: url,
          method,
          data: method !== "GET" ? body : undefined,
          params: method === "GET" ? body : undefined,
        });
        setData(response as T);
      } catch (err) {
        setError(err instanceof Error ? err.message : "API 호출 실패");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, fetchData };
};

export default useApi;
