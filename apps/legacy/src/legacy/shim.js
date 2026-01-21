function getBackbone() {
  if (!window.Backbone) {
    throw new Error('[legacy shim] Backbone is not ready');
  }
  return window.Backbone;
}

function getJquery() {
  return window.jQuery || window.$;
}

function getUnderscore() {
  return window._;
}

export default new Proxy(
  {},
  {
    get(_, prop) {
      const backbone = getBackbone();
      return backbone[prop];
    },
  }
);

export const Backbone = new Proxy(
  {},
  {
    get(_, prop) {
      const backbone = getBackbone();
      return backbone[prop];
    },
  }
);

export const $ = new Proxy(
  {},
  {
    get(_, prop) {
      const jq = getJquery();
      return jq[prop];
    },
  }
);

export const _ = new Proxy(
  {},
  {
    get(_, prop) {
      const u = getUnderscore();
      return u[prop];
    },
  }
);
