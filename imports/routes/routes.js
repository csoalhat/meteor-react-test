import { Meteor } from  'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

//pages you can see without login
const unauthenticatedPages = ['/', '/signup'];
//pages you need to be logged in to see
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  //checks whether our page is in authenticatedPages or unauthenticatedPages
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links');
  }
  else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => {
        return Meteor.userId() ? <Redirect to="/links" /> : <Login />
     }} />
     <Route path="/signup" render={() => {
       return Meteor.userId() ? <Redirect to="/links" /> : <Signup />
     }} />
     <Route path="/links" render={() => {
       return !Meteor.userId() ? <Redirect to="/" /> : <Link />
     }} />
     <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
