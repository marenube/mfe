'use client';

import { useSyncExternalStore } from 'react';

type CounterStore = {
  getSnapshot: () => number;
  subscribe: (cb: () => void) => () => void;
  increment(): void;
  decrement(): void;
};

type Props = {
  counter: CounterStore;
};

export default function Counter({ counter }: Props) {
  const count = useSyncExternalStore(
    counter.subscribe,
    counter.getSnapshot,
    counter.getSnapshot
  );

  return (
    <div
      style={{
        border: '2px solid #3b82f6',
        padding: 16,
        color: '#f9fafb',
      }}
    >
      <h3 style={{ color: '#93c5fd' }}>React Counter</h3>

      <div style={{ fontSize: 18, marginBottom: 12 }}>
        Count: <strong>{count}</strong>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={counter.increment}
          style={{
            background: '#064e3b',
            color: '#d1fae5',
            border: '2px solid #10b981',
            width: 44,
            height: 44,
            fontSize: 22,
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          +
        </button>

        <button
          onClick={counter.decrement}
          style={{
            background: '#7f1d1d',
            color: '#fee2e2',
            border: '2px solid #ef4444',
            width: 44,
            height: 44,
            fontSize: 22,
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          −
        </button>
      </div>
    </div>
  );
}
