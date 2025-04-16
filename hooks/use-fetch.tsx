import { useEffect, useState } from "react";

/**
 * React hook to fetch data from a given URL
 * @param url - The URL to fetch data from
 * @returns {isLoading: boolean, error: string, data: T | null} - An object containing loading state, error message, and fetched data
 * @example
 * const { isLoading, error, data } = useFetch<MyType>(url: 'https://api.example.com/data');
 */
const useFetch = <T,>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          signal,
        });
        if (!response.ok) {
          throw new Error(
            `Network response failed with status: ${response.statusText}`
          );
        }
        const data: T = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    return () => {
      // Cleanup function to abort the fetch request if the component unmounts
      abortController.abort();
    };
  }, [url]);

  return { error, isLoading, data };
};

export default useFetch;
