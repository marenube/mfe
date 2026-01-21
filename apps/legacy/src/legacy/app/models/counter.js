import Backbone from 'backbone';

const CounterModel = Backbone.Model.extend({
  defaults: {
    count: 0,
  },

  increment() {
    this.set('count', this.get('count') + 1);
  },

  decrement() {
    this.set('count', this.get('count') - 1);
  },
});

export const counterModel = new CounterModel();
