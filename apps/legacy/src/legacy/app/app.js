import Backbone from 'backbone';
import Router from './router';

export function start(el) {
  const router = new Router({ el });
  Backbone.history.stop();
  Backbone.history.start({ pushState: true, root: '/legacy' });
}
