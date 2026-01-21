'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

let legacyScriptLoaded = false;

export default function LegacyMount() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith('/legacy')) return;

    const legacyPath = pathname.replace('/legacy', '');

    window.__LEGACY_APP__?.Backbone?.history.navigate(legacyPath || '', {
      trigger: true,
      replace: true,
    });
  }, [pathname]);

  useEffect(() => {
    window.__PLATFORM_NAV__ = {
      goRoot() {
        router.push('/');
      },
    };
  }, [router]);

  useEffect(() => {
    if (!legacyScriptLoaded) {
      legacyScriptLoaded = true;

      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/legacy/app.js';

      script.onload = () => {
        window.__LEGACY_APP__?.mount?.(containerRef.current!);
      };

      document.body.appendChild(script);
    } else {
      window.__LEGACY_APP__?.mount?.(containerRef.current!);
    }

    return () => {};
  }, []);

  return <div ref={containerRef} />;
}
