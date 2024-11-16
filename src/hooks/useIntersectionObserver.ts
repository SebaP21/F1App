// src/hooks/useIntersectionObserver.ts

import { useEffect, useState, useRef } from 'react';

interface IntersectionObserverHook {
  isIntersecting: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

const useIntersectionObserver = (
  options: IntersectionObserverInit = { threshold: 0.1 }
): IntersectionObserverHook => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { isIntersecting, ref };
};

export default useIntersectionObserver;
