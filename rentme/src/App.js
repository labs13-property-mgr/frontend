import React, { Component } from "react";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import ManagerLogin from "./components/ManagerLogin";
import { ManagerCard, ManagerDash } from "./components/propertyOwner/manager";

import { PropertyDash, PropertyCard, addManagerForm, VendorAddressBk, TenantAddressBk } from "./components/propertyOwner";
import {TenantDashboard, RentReceipts, IssueForm} from "./components/tenant";
import PropertyOwnerSignup from "./components/PropertyOwnerSignup.js";
import RenterSignup from "./components/RenterSignup.js";
import "./App.css";


class App extends Component {
<<<<<<< HEAD

=======
  
>>>>>>> 7fbe657acfb290f0c9b534b2b6ac1903f5b6b648
  logOut = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    console.log(window.location.href)
    this.props.history.push("/");
  };
<<<<<<< HEAD


=======
  
>>>>>>> 7fbe657acfb290f0c9b534b2b6ac1903f5b6b648
  render() {
    return (
      <>
        <MenuAppBar logOut={this.logOut} />
        <Route exact path="/" component={Login} />
        <Route path="/manager-login" component={ManagerLogin} />
        <Route path="/manager-dash" component={ManagerDash} />
        <Route path="/tenant-dash" component={TenantDashboard} />
        <Route path="/property-dash" component={PropertyDash} />
        <Route path="/property-card" component={PropertyCard} />
        <Route path="/vendor-addbook" component={VendorAddressBk} />
        <Route path="/tenant-addbook" component={TenantAddressBk} />
        <Route path="/owner-signup" component={PropertyOwnerSignup} />
        <Route path="/renter-signup" component={RenterSignup} />
        <Route path="/add-manager" component={addManagerForm} />
        <Route path="/manager-profile" component={ManagerCard} />
        <Route path="/view-receipts" component={RentReceipts} />
        <Route path="/issue-report" component={IssueForm} />
      </>
    );
  }
}

export default App;
