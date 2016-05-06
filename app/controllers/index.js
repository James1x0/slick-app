import Ember from 'ember';

const { computed } = Ember;

var r = ( min, max ) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

var pre = [ 'Baffled', 'Confused', 'Homogenic', 'Sugary', 'Stuckup', 'Prissy', 'Princess', 'Queen', 'Totally', 'Sticky', 'Explosive', 'Psycho' ],
    suf = [ 'Pirate', 'Waffle', 'Muffin', 'Bacon', 'Scott', 'James', 'Slicker', 'Socket', 'Function', 'Byte', 'Poo', 'Rockets', 'Taco', 'Banana' ];

export default Ember.Controller.extend({
  socket: Ember.inject.service(),
  username: computed.reads('randomUsername'),

  randomUsername: computed(function () {
    return pre[r(0, pre.length)] + ' ' + suf[r(0, suf.length)];
  }),

  actions: {
    authenticate () {
      const user = this.get('username'),
            socket = this.get('socket');

      this.set('loggingIn', true);

      socket.emit('login', user);
      socket.on('login success', () => {
        this.set('loggingIn', false);
        socket.set('user', user);
        this.transitionToRoute('chat');
      });
    }
  }
});
