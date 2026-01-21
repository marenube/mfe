import Backbone from 'backbone';

export default Backbone.View.extend({
  render() {
    this.$el.html(`
      <div>
        <h2 style="color: #facc15;">Legacy Detail View</h2>
        <p>디테일 화면 콘텐츠</p>
      </div>
    `);
    return this;
  },
});
