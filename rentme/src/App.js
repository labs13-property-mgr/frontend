import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import ManagerLogin from "./components/ManagerLogin";
import { ManagerCard, ManagerDash } from "./components/propertyOwner/manager";

import { PropertyDash, PropertyCard, addManagerForm, VendorAddressBk, TenantAddressBk } from "./components/propertyOwner";
import { RentReceipts, IssueForm} from "./components/tenant";
import PropertyOwnerSignup from "./components/PropertyOwnerSignup.js";
import RenterSignUp from "./components/RenterSignUp";
import Account from "./components/Account";
import PasswordForget from "./components/PasswordForget";
import TenantDashboard from "./components/tenant/TenantDashboard";
import "./App.css";

import * as ROUTES from './constants/routes';


const App = () => (
  <Router>
      <>

        {/* <NavBar /> coming */}

        <hr />

        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.RENTER_SIGNUP} component={RenterSignUp} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route exact path={ROUTES.ACCOUNT} component={Account} />

        <Route exact path={ROUTES.TENANT_DASHBOARD} component={TenantDashboard} />

        <Route path="/manager-login" component={ManagerLogin} />
        <Route path="/manager-dash" component={ManagerDash} />
        {/* <Route path="/tenant-dash" component={TenantDashboard} /> */}
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
