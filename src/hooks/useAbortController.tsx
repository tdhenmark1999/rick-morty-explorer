import { useRef, useEffect } from 'react';

export function useAbortController() {
  const abortControllerRef = useRef<AbortController | null>(null);

  const getSignal = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current.signal;
  };

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { getSignal, abort };
}