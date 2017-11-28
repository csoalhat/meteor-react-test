import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
// ^^ thats where the login method is

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    //calls super and repasses the props not to lose them because we override the constructor
    // state is imnternal to component
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value;

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({error: 'Unable to login. Check your email and password.'});
      } else {
        this.setState({error: ''});
      }
    })
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : undefined }
            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type='email' ref='email' name='email' placeholder='email'/>
              <input type='password' ref='password' name='password' placeholder='password'/>
              <button className="button">Login</button>
            </form>
          </div>
          <Link to="/signup">Don't have an account?</Link>
        </div>
      </div>
    )
  }
}
