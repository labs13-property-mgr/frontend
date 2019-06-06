import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import ManagerLogin from './components/ManagerLogin';
import ManagerDash from './components/ManagerDash';
import { TenantDashboard } from './components/tenant';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
      <Route exact path="/" component={Login} />
      <Route path="/manager-login" component={ManagerLogin} />
      <Route path="/manager-dash" component={ManagerDash} />
      <Route path="/tenant-dash" component={TenantDashboard} />
      </>
    )
  }
}

export default App;
