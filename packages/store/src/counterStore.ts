type Listener = () => void;

class CounterStore {
  private count = 0;
  private listeners = new Set<Listener>();

  getSnapshot = () => this.count;

  subscribe = (l: Listener) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };

  increment = () => {
    this.count += 1;
    this.emit();
  };

  decrement = () => {
    this.count -= 1;
    this.emit();
  };

  set = (value: number) => {
    this.count = value;
    this.emit();
  };

  private emit() {
    this.listeners.forEach(l => l());
  }
}

declare global {
  interface Window {
    __COUNTER_STORE__?: CounterStore;
  }
}

export const counterStore =
  window.__COUNTER_STORE__ ?? (window.__COUNTER_STORE__ = new CounterStore());

let store: CounterStore | null = null;

export function getCounterStore(): CounterStore {
  if (typeof window === 'undefined') {
    throw new Error('counterStore는 client에서만 사용해야 합니다.');
  }

  if (!store) {
    store =
      window.__COUNTER_STORE__ ??
      (window.__COUNTER_STORE__ = new CounterStore());
  }

  return store;
}
