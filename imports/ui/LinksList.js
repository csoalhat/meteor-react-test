import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props) {
    //always pass in the props not to lose them
    super(props);
    this.state = {
      links: []
    };
  }

  //gets called once the component loads
  componentDidMount() {
    //starts tracker and creates this.linksTracker in order to be able to call it and stop it on unmount
    this.linksTracker = Tracker.autorun(() => {
      //to be able to see all links from main.js client
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    })
  }

  //when will unmount
  componentWillUnmount() {
    //stops tracker when unmount this component
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if(this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status">No links found</p>
        </div>
      )
    }
    else {
      return this.state.links.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
      })
    }
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}
