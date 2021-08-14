import { useEffect, useState, useReducer, Dispatch } from "react";

/**
 * Inspired by https://usehooks.com/useDebounce/
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

function stateReducer<T extends Record<string, unknown>>(
  state: T,
  action: T | ((previousState: T) => T)
): T {
  if (typeof action === "function") {
    return action(state);
  }
  return {
    ...state,
    ...action,
  };
}

export function useStateReducer<T extends Record<string, unknown>>(
  initialState: T
): [T, Dispatch<T | ((p: T) => T)>] {
  return useReducer<(previousState: T, nextState: T | ((p: T) => T)) => T>(
    stateReducer,
    initialState
  );
}
