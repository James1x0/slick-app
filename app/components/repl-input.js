import Ember from 'ember';

export default Ember.Component.extend({
  history: Ember.A(),
  historyIndex: 0,

  keyUp ( e ) {
    if ( e.keyCode === 38 ) {
      let historyIndex = this.get('historyIndex') || this.get('history.length') - 1;

      if ( historyIndex < 0 ) {
        return;
      }

      this.set('value', this.get('history').objectAt(historyIndex));
      this.decrementProperty('historyIndex');
    }
  },

  actions: {
    submit () {
      const val = this.get('value');
      this.get('onsubmit')(val);
      this.get('history').push(val);
      this.setProperties({
        value: undefined,
        historyIndex: this.get('history.length') - 1
      });
    }
  }
});
