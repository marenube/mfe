import Backbone from 'backbone';
import { mountReact } from '@repo/ui-react/mountReact';
import Counter from '@repo/ui-react/Counter';
import { counterAdapter } from '../../adapters/counterAdapters';

export default Backbone.View.extend({
  initialize() {
    this.currentContentView = null;
    this._reactMounted = false;
  },

  render() {
    if (this._rendered) return this;
    this._rendered = true;

    this.$el.html(`
      <div
        style="
          border: 2px dashed #f59e0b;
          padding: 16px;
          margin-bottom: 16px;
          color: #f9fafb;
        "
      >
        <h1 style="margin-top: 0; color: #fbbf24;">
          Legacy 영역 (Backbone)
        </h1>

        <p style="margin: 4px 0 12px; color: #fde68a; font-size: 14px;">
          Backbone 기반 레거시 애플리케이션
        </p>

        <div class="legacy-nav" style="margin-bottom: 16px; display: flex; gap: 8px;">
          <button
            data-go-root
            style="
              background: #1f2937;
              color: #f9fafb;
              border: 1px solid #f59e0b;
              padding: 6px 12px;
              cursor: pointer;
            "
          >
            Platform Home (Next router)
          </button>

          <button
            data-go-main
            style="
              background: #1f2937;
              color: #f9fafb;
              border: 1px solid #f59e0b;
              padding: 6px 12px;
              cursor: pointer;
            "
          >
            Legacy Main (Backbone router)
          </button>

          <button
            data-go-detail
            style="
              background: #1f2937;
              color: #f9fafb;
              border: 1px solid #f59e0b;
              padding: 6px 12px;
              cursor: pointer;
            "
          >
            Legacy Detail (Backbone router)
          </button>
        </div>

        <div class="legacy-content"></div>

        <h2 style="margin-top: 24px; color: #93c5fd;">
          React 영역
        </h2>

        <div class="react-area"></div>
      </div>
    `);

    const reactEl = this.el.querySelector('.react-area');
    this._unmountReact = mountReact(Counter, reactEl, {
      counter: counterAdapter,
    });
    this._reactMounted = true;

    return this;
  },

  setContent(view) {
    const container = this.el.querySelector('.legacy-content');
    this.currentContentView = view;
    view.setElement(container);
    view.render();
  },

  events: {
    'click [data-go-root]': 'goRoot',
    'click [data-go-main]': 'goMain',
    'click [data-go-detail]': 'goDetail',
  },

  goRoot(e) {
    e.preventDefault();
    window.__PLATFORM_NAV__?.goRoot();
  },

  goMain() {
    Backbone.history.navigate('', { trigger: true });
  },

  goDetail() {
    Backbone.history.navigate('detail', { trigger: true });
  },

  remove() {
    this._unmountReact?.();
    this.currentContentView?.remove();
    return Backbone.View.prototype.remove.call(this);
  },
});
