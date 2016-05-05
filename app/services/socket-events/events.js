import Ember from 'ember';

export default {
  connection () {
    this.set('connected', true);
  },

  disconnect () {
    this.set('connected', false);
  },

  error ( err ) {
    Ember.Logger.error(err);
  }
};
