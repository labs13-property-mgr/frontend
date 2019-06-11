import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import ManagerLogin from "./components/ManagerLogin";
import { ManagerCard, ManagerDash } from "./components/propertyOwner/manager";

import { PropertyDash, PropertyCard, addManagerForm, VendorAddressBk, TenantAddressBk, addTenantForm } from "./components/propertyOwner";
import { RentReceipts, IssueForm} from "./components/tenant";
import PropertyOwnerSignup from "./components/PropertyOwnerSignup";
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
        <Route exact path={ROUTES.OWNER_SIGNUP} component={PropertyOwnerSignup} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route exact path={ROUTES.ACCOUNT} component={Account} />

        <Route exact path={ROUTES.TENANT_DASHBOARD} component={TenantDashboard} />
        <Route exact path={ROUTES.OWNER_DASHBOARD} component={PropertyDash} />

        <Route exact path={ROUTES.PROPERTY_CARD} component={PropertyCard} />

        <Route path="/manager-login" component={ManagerLogin} />
        <Route path="/manager-dash" component={ManagerDash} />
        <Route path="/vendor-addbook" component={VendorAddressBk} />
        <Route path="/tenant-addbook" component={TenantAddressBk} />
        <Route path="/add-manager" component={addManagerForm} />
        <Route path="/manager-profile/:id" component={ManagerCard} />
        <Route path="/view-receipts" component={RentReceipts} />
        <Route path="/issue-report" component={IssueForm} />
        <Route path="/property-card/:id" component={PropertyCard} />
        <Route path="/add-tenant" component={addTenantForm} />
      </>

    </Router>
);

export default App;
