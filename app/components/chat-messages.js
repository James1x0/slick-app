import Ember from 'ember';

const { run, observer } = Ember;

export default Ember.Component.extend({
  classNames: [ 'ui', 'chat__messages', 'list' ],

  updateChatScroll: observer('messages.[]', function () {
    run.scheduleOnce('afterRender', () => this.$().scrollTop(this.$()[0].scrollHeight));
  })
});
