import Ember from 'ember';

export default Ember.Controller.extend({
  socket: Ember.inject.service(),
  messages: Ember.A(),

  init () {
    const socket = this.get('socket');

    socket.on('new message', message => {
      this.get('messages').pushObject(message);
    });

    socket.on('user joined', username => {
      this.get('messages').pushObject({
        text: username + ' joined the chat.'
      });
    });

    socket.on('user error', error => {
      this.set('error', error);
    });
  },

  actions: {
    sendMessage ( message ) {
      this.set('error', undefined);
      this.get('socket').emit('message', message);
    }
  }
});
