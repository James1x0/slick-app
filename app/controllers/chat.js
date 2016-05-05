import Ember from 'ember';

export default Ember.Controller.extend({
  socket: Ember.inject.service(),
  messages: Ember.A(),

  init () {
    this.get('socket').on('message', ( message ) => {
      this.get('messages').pushObject(message);
    });
  },

  actions: {
    sendMessage () {
      const user = this.get('model'),
            message = this.get('message');

      this.get('socket').emit('message', { text: message, user });
      this.set('message', undefined);
    }
  }
});
