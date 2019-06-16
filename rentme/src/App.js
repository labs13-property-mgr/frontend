import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import ManagerLogin from "./components/ManagerLogin";
import { ManagerCard, ManagerDash } from "./components/propertyOwner/manager";

import MenuAppBar from "./components/Nav/Navbar";
import {
  PropertyDash,
  PropertyCard,
  addManagerForm,
  VendorAddressBK,
  TenantAddressBk,
  AddTenantForm
} from "./components/propertyOwner";
import { RentReceipts } from "./components/tenant";
import PropertyOwnerSignup from "./components/PropertyOwnerSignup";
import RenterSignUp from "./components/RenterSignUp";
import Account from "./components/Account";
import PasswordForget from "./components/PasswordForget";
import PasswordChange from "./components/PasswordChange";
import TenantDashboard from "./components/tenant/TenantDashboard";
import TenantCard from "./components/propertyOwner/TenantCard";
import AddPropertyForm from "./components/propertyOwner/AddPropertyForm";
import AddIssueForm from "./components/tenant/AddIssueForm";
import "./App.css";

import * as ROUTES from "./constants/routes";

const App = () => (
  <Router>
    <>
      <MenuAppBar />

      {/* Authentication/Account Related */}
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.RENTER_SIGNUP} component={RenterSignUp} />
      <Route exact path={ROUTES.OWNER_SIGNUP} component={PropertyOwnerSignup} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route exact path ={ROUTES.PASSWORD_CHANGE} component={PasswordChange} />
      <Route exact path={ROUTES.ACCOUNT} component={Account} />

      {/* Dashboard Views */}
      <Route exact path={ROUTES.TENANT_DASHBOARD} component={TenantDashboard} />
      <Route exact path={ROUTES.OWNER_DASHBOARD} component={PropertyDash} />

      {/* Property Owner Routes */}
      <Route exact path={ROUTES.PROPERTY_CARD} component={PropertyCard} />
      <Route exact path={ROUTES.ADD_TENANT} component={AddTenantForm} />
      <Route exact path={ROUTES.ADD_PROPERTY} component={AddPropertyForm} />
      <Route exact path={ROUTES.TENANT_ADDRESSBK} component={TenantAddressBk} />
      <Route exact path={ROUTES.VENDOR_ADDRESSBK} component={VendorAddressBK} />

      {/* Tenant Routes */}
      <Route exact path={ROUTES.RENT_RECEIPTS} component={RentReceipts} />
      <Route exact path={ROUTES.ADD_ISSUE_FORM} component={AddIssueForm} />
      <Route exact path={ROUTES.TENANT_CARD} component={TenantCard} />

      {/* Hold for Stretch */}
      <Route path="/manager-login" component={ManagerLogin} />
      <Route path="/manager-dash" component={ManagerDash} />
      <Route path="/add-manager" component={addManagerForm} />
      <Route path="/manager-profile/:id" component={ManagerCard} />
    </>
  </Router>
);

export default App;
