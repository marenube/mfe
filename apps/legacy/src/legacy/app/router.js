import Backbone from 'backbone';
import LegacyLayoutView from './views/layout';
import MainView from './views/main';
import DetailView from './views/detail';

export default Backbone.Router.extend({
  initialize(options) {
    this.el = options.el;
    this.layout = null;
  },

  routes: {
    '': 'main',
    detail: 'detail',
  },

  ensureLayout() {
    if (!this.layout) {
      this.layout = new LegacyLayoutView({ el: this.el });
      this.layout.render();
    }
  },

  main() {
    this.ensureLayout();
    this.layout.setContent(new MainView());
  },

  detail() {
    this.ensureLayout();
    this.layout.setContent(new DetailView());
  },
});
