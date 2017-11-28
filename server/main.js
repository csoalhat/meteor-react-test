import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

//executes the file
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simpl-schema-config';

Meteor.startup(() => {
  //this is to redirect if url has a link id
  WebApp.connectHandlers.use((req, res,next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({_id: _id});
    //find one : use when returns only one. returns undefined if none or the doc.
    if (link) {
      res.statusCode = 302;
      res.setHeader ('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
    // next allows server to continue once middlewear has run
  })
});
