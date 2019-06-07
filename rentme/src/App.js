import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import ManagerLogin from './components/ManagerLogin';
import ManagerDash from './components/ManagerDash';
import TenantDashboard from './components/tenant/TenantDashboard';
import MenuAppBar from './components/Navbar'

import './App.css';

class App extends Component {

  logOut = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    console.log(window.location.href)
    this.props.history.push("/");
  };

  render() {
    return (
      <>
      <MenuAppBar logOut={this.logOut} />
      <Route exact path="/" component={Login} />
      <Route path="/manager-login" component={ManagerLogin} />
      <Route path="/manager-dash" component={ManagerDash} />
      <Route path="/tenant-dash" component={TenantDashboard} />
      </>
    )
  }
}

export default App;
