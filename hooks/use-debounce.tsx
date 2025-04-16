import { useEffect, useState } from "react";

/**
 * @description A custom hook that returns a debounced value after a specified delay.
 * @param {T} value
 * @param {number} delay
 */
const useDebounce = <T,>(value: T, delay: number = 400) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
