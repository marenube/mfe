'use client';

import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/legacy/app.js';

    script.onload = () => {
      window.__LEGACY_APP__?.mount(container);
    };

    document.body.appendChild(script);

    return () => {
      window.__LEGACY_APP__?.unmount();
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} />;
}
