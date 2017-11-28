import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  //publish takes 2 arg. name (doesnt matter) and function to determine data specific client has access to
  // links is being called in linkslist on componentDidMount
  // in order to access users, need to use es5 function to access bind
  Meteor.publish('links', function () {
    //returns all links for everyone return Links.find();
    return Links.find({userId: this.userId});
  });
}

//methods
Meteor.methods({
  //links is just naming convention. not linked to other links
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error ('Not authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        //label will be what the error message will call url
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });

    Links.insert({
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })
  },

  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error ('Not authorized');
    }

    new SimpleSchema({
      visible: {
        type: Boolean
      },
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id, visible });

    Links.update({
      _id,
      userId: this.userId
    }, { $set: { visible } }
  )},

  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update({_id}, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
});
