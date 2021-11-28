import React from "react";
import { Story, Meta } from "@storybook/react";

import BaseSyntaxHighlighter, {
  BaseSyntaxHighlighterProps,
} from "./BaseSyntaxHighlighter";

export default {
  title: "BaseSyntaxHighlighter",
  component: BaseSyntaxHighlighter,
} as Meta;

const Template: Story<BaseSyntaxHighlighterProps> = (args) => (
  <BaseSyntaxHighlighter {...args} />
);

const CODE = `import {
  useEffect,
  useState,
  useReducer,
  Dispatch,
  EffectCallback,
  DependencyList,
  useRef,
  SetStateAction,
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
  callback: EffectCallback | (() => Promise<unknown>),
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

export function usePrevious<T>(value: T): T {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref: any = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

// inspired by https://usehooks.com/useLocalStorage/
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): Readonly<[T, Dispatch<SetStateAction<T>>]> {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
`;

export const Base = Template.bind({});
Base.args = {
  code: CODE,
};
