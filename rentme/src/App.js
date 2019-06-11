import React, { Component } from "react";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import ManagerLogin from "./components/ManagerLogin";
import { ManagerCard, ManagerDash } from "./components/propertyOwner/manager";

import {
  PropertyDash,
  PropertyCard,
  addManagerForm,
  VendorAddressBk,
  TenantAddressBk
} from "./components/propertyOwner";
import { TenantDashboard, RentReceipts, IssueForm } from "./components/tenant";
import PropertyOwnerSignup from "./components/PropertyOwnerSignup.js";
import RenterSignup from "./components/RenterSignup.js";
import "./App.css";
import AddTenantForm from "./components/propertyOwner/addTenantForm.js";

class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Login} />
        <Route path="/manager-login" component={ManagerLogin} />
        <Route path="/manager-dash" component={ManagerDash} />
        <Route path="/tenant-dash" component={TenantDashboard} />
        <Route path="/property-dash" component={PropertyDash} />
        {/* <Route path="/property-card" component={PropertyCard} /> */}
        <Route path="/vendor-addbook" component={VendorAddressBk} />
        <Route path="/tenant-addbook" component={TenantAddressBk} />
        <Route path="/owner-signup" component={PropertyOwnerSignup} />
        <Route path="/renter-signup" component={RenterSignup} />
        <Route path="/add-manager" component={addManagerForm} />
        <Route path="/manager-profile/:id" component={ManagerCard} />
        <Route path="/view-receipts" component={RentReceipts} />
        <Route path="/issue-report" component={IssueForm} />
        <Route path="/property-card/:id" component={PropertyCard} />
        <Route path="/add-tenant" component={AddTenantForm} />
      </>
    );
  }
}

export default App;
