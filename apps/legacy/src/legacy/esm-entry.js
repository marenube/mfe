import legacyEntry from './index';

const mountedRoots = new WeakMap();

function ensureRoot(container) {
  let root = container.querySelector('#legacy-root');

  if (!root) {
    root = document.createElement('div');
    root.id = 'legacy-root';
    container.appendChild(root);
  }

  return root;
}

function mount(container) {
  if (!container) return;
  if (mountedRoots.has(container)) return;

  const root = ensureRoot(container);
  legacyEntry(root);

  mountedRoots.set(container, root);
}

function unmount(container) {
  if (!container) return;
  const root = mountedRoots.get(container);
  if (!root) return;

  root.remove();
  mountedRoots.delete(container);
}

window.__LEGACY_APP__ = { mount, unmount, Backbone };
