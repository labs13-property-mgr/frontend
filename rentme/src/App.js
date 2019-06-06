import React, { Component } from "react";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import ManagerLogin from "./components/ManagerLogin";
import { ManagerCard, ManagerDash } from "./components/propertyOwner/manager";
import PropertyOwnerSignup from "./components/PropertyOwnerSignup.js";
import RenterSignup from "./components/RenterSignup.js";
import AddManagerForm from "./components/propertyOwner/addManagerForm.js";
import { TenantDashboard, IssueForm, RentReceipts } from './components/tenant';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
      <Route exact path="/" component={Login} />
       <Route path="/manager-login" component={ManagerLogin} />
       <Route path="/manager-dash" component={ManagerDash} />
       <Route path="/tenant-dash" component={TenantDashboard} />
       <Route path="/owner-signup" component={PropertyOwnerSignup} />
       <Route path="/renter-signup" component={RenterSignup} />
       <Route path="/add-manager" component={AddManagerForm} />
       <Route path="/manager-profile" component={ManagerCard} />
       <Route path="/issue-report" component={IssueForm} />
       <Route path="/view-receipts" component={RentReceipts} />
      </>
    );
  }
}

export default App;
