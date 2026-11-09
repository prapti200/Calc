'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function OmniCalcClient({ initialHtml }) {
  const containerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dispatch router to synchronize state with current URL
    if (window.AppRouter && typeof window.AppRouter.dispatch === 'function') {
      window.AppRouter.dispatch();
    }

    // Attach delegated input listener to guarantee instant search on mobile & desktop
    const container = containerRef.current;
    if (!container) return;

    const handleInput = (e) => {
      const target = e.target;
      if (!target || !window.SuiteSearchEngine) return;
      if (target.id === 'global-search-input') {
        window.SuiteSearchEngine.search('hub', target.value);
      } else if (target.id === 'fin-catalog-search') {
        window.SuiteSearchEngine.search('fin', target.value);
      } else if (target.id === 'fit-catalog-search') {
        window.SuiteSearchEngine.search('fit', target.value);
      } else if (target.id === 'math-catalog-search') {
        window.SuiteSearchEngine.search('math', target.value);
      } else if (target.id === 'other-catalog-search') {
        window.SuiteSearchEngine.search('other', target.value);
      }
    };

    container.addEventListener('input', handleInput);
    return () => {
      container.removeEventListener('input', handleInput);
    };
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      id="omnicalc-app-root"
      dangerouslySetInnerHTML={{ __html: initialHtml }}
      suppressHydrationWarning
    />
  );
}
