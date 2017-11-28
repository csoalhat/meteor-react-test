import { Meteor } from  'meteor/meteor';
import ReactDom from  'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from './../imports/routes/routes';
import '../imports/startup/simpl-schema-config';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
  // !! shows whether there is a user or not (true or false if empty)
  // console.log('isAuthenticated', isAuthenticated);
});

// Session.set('name', 'Caroline');
// const name = Session.get('name');

Meteor.startup(() => {
  Session.set('showVisible', true);
  //jsx to render and location to render it to
  ReactDom.render(routes, document.getElementById('app'));
});
