import { useEffect, useState } from 'react';

/**
 * It returns a debounced version of the value passed in
 * @param {string} value - The value to be debounced.
 * @param [delay=500] - The amount of time to wait before updating the value.
 * @returns A debounced value.
 */
const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
