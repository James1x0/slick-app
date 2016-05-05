import Ember from 'ember';
import events from './socket-events/events';

const { RSVP } = Ember;

export default Ember.Service.extend({
  init () {
    return new RSVP.Promise((resolve, reject) => {
      const socket = io();
      this.set('_socket', socket);

      socket.on('connection', () => resolve(socket));
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
      socket.emit.apply(this, args);
    };

    if ( this.get('connected') ) {
      emit();
    } else {
      Ember.Logger.debug('Putting off emitting event:', args[0]);
      socket.on('connection', emit);
    }
  },

  on () {
    this.get('_socket').on(...arguments);
  }
});
