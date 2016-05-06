import Ember from 'ember';

export default Ember.Route.extend({
  socket: Ember.inject.service(),

  beforeModel () {
    const socket = this.get('socket');

    if ( !socket.get('connected') || !socket.get('user') ) {
      return this.transitionTo('index');
    }
  },

  model () {
    return this.get('socket.user');
  }
});
