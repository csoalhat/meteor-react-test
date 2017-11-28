import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props),
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }

  onSubmit(e) {
    const url = this.state.url.trim();

    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
        //clear form andn removes inputs if no error
      }
      else {
        this.setState({error: err.reason});
      }
    });
  }

  onChange(e) {
    this.setState({
      url: e.target.value
    })
  }

  handleModalClose() {
    this.setState({isOpen: false, url:'', error:''})
  }

  render () {
    return (
      <div>
        <button className="button" onClick={()=>this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel='Add Link'
          onAfterOpen={()=>this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <em>Add link</em>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button className="button">Add Link</button>
            {/* add type button so this button doesnt submit the form */}
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  };
}
