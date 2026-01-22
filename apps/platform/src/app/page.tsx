'use client';

import dynamic from 'next/dynamic';

const ClientCounter = dynamic(
  async () => {
    const { getCounterStore } = await import('@repo/store');
    const Counter = (await import('@repo/ui-react/Counter')).default;

    return function CounterWrapper() {
      const store = getCounterStore();
      return <Counter counter={store} />;
    };
  },
  {
    ssr: false,
  }
);

export default function PlatformHomePage() {
  return <ClientCounter />;
}
