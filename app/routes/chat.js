import Ember from 'ember';

export default Ember.Route.extend({
  socket: Ember.inject.service(),

  beforeModel () {
    // if ( !this.get('socket.connected') ) {
    //   return this.get('socket').init();
    // }
  },

  model () {
    return this.get('socket.user');
  }
});
