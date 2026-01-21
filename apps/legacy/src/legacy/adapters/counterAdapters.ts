import { counterStore } from '@repo/store';
import { counterModel } from '../app/models/counter';

counterModel.on('change:count', () => {
  counterStore.set(counterModel.get('count'));
});

counterStore.subscribe(() => {
  const next = counterStore.getSnapshot();
  if (counterModel.get('count') !== next) {
    counterModel.set('count', next);
  }
});

export const counterAdapter = {
  getSnapshot: counterStore.getSnapshot,
  subscribe: counterStore.subscribe,
  increment: counterStore.increment,
  decrement: counterStore.decrement,
};
