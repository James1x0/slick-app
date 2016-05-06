import Ember from 'ember';

export default {
  disconnect () {
    this.set('connected', false);
  },

  error ( err ) {
    Ember.Logger.error(err);
  }
};
