import { useEffect, useRef } from 'react';

/**
 * Custom hook that returns the previous value of a given value.
 *
 * @param value - The current value
 * @returns The previous value, or undefined if this is the first render
 */
export function usePrevious<T> (value: T): T | undefined {
  // Create a ref to store the previous value
  const ref = useRef<T>();

  // Update the ref with the new value on each render
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value stored in the ref (happens before update in useEffect above)
  return ref.current;
}
