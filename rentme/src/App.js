import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import ManagerLogin from "./components/ManagerLogin";
import { ManagerCard, ManagerDash } from "./components/propertyOwner/manager";

import { PropertyDash, PropertyCard, addManagerForm, VendorAddressBk, TenantAddressBk } from "./components/propertyOwner";
import {TenantDashboard, RentReceipts, IssueForm} from "./components/tenant";
import PropertyOwnerSignup from "./components/PropertyOwnerSignup.js";
import RenterSignup from "./components/RenterSignup.js";
import Account from "./components/Account";
import PasswordForget from "./components/PasswordForget";
import "./App.css";

import * as ROUTES from './constants/routes';


const App = () => (
  <Router>
      <>

        <hr />

        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.RENTER_SIGNUP} component={RenterSignup} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route exact path={ROUTES.ACCOUNT} component={Account} />

        <Route path="/manager-login" component={ManagerLogin} />
        <Route path="/manager-dash" component={ManagerDash} />
        <Route path="/tenant-dash" component={TenantDashboard} />
        <Route path="/property-dash" component={PropertyDash} />
        <Route path="/property-card" component={PropertyCard} />
        <Route path="/vendor-addbook" component={VendorAddressBk} />
        <Route path="/tenant-addbook" component={TenantAddressBk} />
        <Route path="/owner-signup" component={PropertyOwnerSignup} />
        <Route path="/add-manager" component={addManagerForm} />
        <Route path="/manager-profile" component={ManagerCard} />
        <Route path="/view-receipts" component={RentReceipts} />
        <Route path="/issue-report" component={IssueForm} />
      </>

    </Router>
);

export default App;
