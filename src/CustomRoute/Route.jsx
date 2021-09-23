import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Movies from '../Components/Movies/Movies';
import Movie from '../Components/Movie/Movie';

const MyRoute = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/movies' component={Movies} />
    <Route path='/movie/:title' component={Movie} />
    <Redirect to='/' />
  </Switch>
);

export default MyRoute;
