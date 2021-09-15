import {
  useEffect,
  useState,
  useReducer,
  Dispatch,
  EffectCallback,
  DependencyList,
} from "react";

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

export type StateReducerActionType<T> = T | ((previousState: T) => T);

function stateReducer<T extends Record<string, unknown>>(
  state: T,
  action: StateReducerActionType<T>
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
): [T, Dispatch<StateReducerActionType<T>>] {
  return useReducer<
    (previousState: T, nextState: StateReducerActionType<T>) => T
  >(stateReducer, initialState);
}

export function useEffectSkipFirst(
  callback: EffectCallback,
  dependencies: DependencyList | undefined,
  callbackFirstEffect?: EffectCallback
): void {
  const [isFirstEffect, setIsFirstEffect] = useState(true);
  useEffect(() => {
    if (!isFirstEffect) {
      callback();
    } else if (typeof callbackFirstEffect === "function") {
      callbackFirstEffect();
    }
    setIsFirstEffect(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
