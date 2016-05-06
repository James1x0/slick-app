import Ember from 'ember';

export default Ember.Component.extend({
  history: Ember.A(),
  keysDown: Ember.A(),
  historyIndex: 0,

  keyUp ( e ) {
    this.get('keysDown').removeObject(e.keyCode);

    if ( e.keyCode === 38 ) {
      let historyIndex = this.get('historyIndex') || this.get('history.length') - 1;

      if ( historyIndex < 0 ) {
        return;
      }

      this.set('value', this.get('history').objectAt(historyIndex));
      this.decrementProperty('historyIndex');
    }
  },

  keyDown ( e ) {
    const keysDown = this.get('keysDown');
    keysDown.addObject(e.keyCode);

    if ( keysDown.contains(186) && (keysDown.contains(91) || keysDown.contains(17)) ) {
      this.get('onsubmit')('/giphy ');
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
