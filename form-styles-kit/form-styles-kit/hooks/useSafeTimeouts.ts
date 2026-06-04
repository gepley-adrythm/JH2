'use client';

import { useRef, useCallback, useEffect } from 'react';

export function useSafeTimeouts() {
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const safeTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
    return id;
  }, []);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    };
  }, []);

  return { safeTimeout, clearAll };
}
