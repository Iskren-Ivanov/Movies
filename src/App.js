import React from 'react';

import MyRoute from './CustomRoute/Route';
import NavigationBar from './Components/NavigationBar/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import './App.css';

const App = () => (
  <div className='app'>
    <NavigationBar />
    <MyRoute />
  </div>
);

export default App;
