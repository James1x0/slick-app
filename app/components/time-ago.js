import Ember from 'ember';
import moment from 'moment';

moment.fn.fromNowWithSeconds = function ( m ) {
  const secDiff = Math.round(Math.abs(moment().diff(this)) / 1000);

  if ( secDiff < 10 ) { // 10 sec
    return 'just now';
  } else if ( secDiff < 60 ) {
    return secDiff + ' seconds ago';
  }

  return this.fromNow(m);
};

const TimeAgo = Ember.Component.extend({
  tagName: 'span',
  positionalParams: [ 'time' ],

  _tick: Ember.on('didInsertElement', function () {
    if ( this.get('isDestroying') || this.get('isDestroyed') ) {
      return;
    }

    this.set('computedTimeAgo', this.get('time') ? moment(this.get('time')).fromNowWithSeconds() : 'N/A');

    Ember.run.later(this, this._tick, 1000);
  })
});

TimeAgo.reopenClass({
  positionalParams: [ 'time' ]
});

export default TimeAgo;
