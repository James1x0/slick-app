import Ember from 'ember';
import events from './socket-events/events';

const { RSVP } = Ember;

export default Ember.Service.extend({
  init () {
    return new RSVP.Promise((resolve, reject) => {
      const socket = io();
      this.set('_socket', socket);

      socket.on('connect', () => {
        this.set('connected', true);
        Ember.Logger.debug('Socket :: Connected');
        resolve(socket);
      });
      socket.on('error', reject);

      for ( let eventName in events ) {
        if ( !events.hasOwnProperty(eventName) ) {
          continue;
        }

        socket.on(eventName, events[eventName].bind(this));
      }

      return socket;
    });
  },

  // Socket.emit proxy w/ waiting
  emit () {
    const socket = this.get('_socket'),
          args = arguments;

    let emit = () => {
      Ember.Logger.debug('Emitting event:', args[0]);
      socket.emit.apply(socket, args);
    };

    if ( this.get('connected') ) {
      emit();
    } else {
      Ember.Logger.debug('Deferring event:', args[0]);
      socket.on('connect', emit);
    }
  },

  on ( event, callback ) {
    this.get('_socket').on(event, callback);
  }
});
