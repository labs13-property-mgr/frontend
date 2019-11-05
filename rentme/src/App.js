import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import Login from "./components/Login";
import ManagerLogin from "./components/ManagerLogin";
import { ManagerCard, ManagerDash } from "./components/propertyOwner/manager";
import MenuAppBar from "./components/MenuAppBar";
import {
  PropertyDash,
  PropertyCard,
  addManagerForm,
  VendorAddressBK,
  TenantAddressBk,
  AddTenantForm,
  EditTenantForm,
  AddPropertyForm,
  EditPropertyForm,
  AddVendorForm,
  EditVendorForm,
  VendorCard,
  TenantCard
} from "./components/propertyOwner";
import { RentReceipts } from "./components/tenant";
import PropertyOwnerSignup from "./components/PropertyOwnerSignup";
import RenterSignUp from "./components/RenterSignUp";
import Account from "./components/Account";
import PasswordForget from "./components/PasswordForget";
import PasswordChange from "./components/PasswordChange";
import { TenantDashWithFirebase } from "./components/tenant/TenantDashboard";
import TenantDashboard from "./components/tenant/TenantDashboard";
import AddIssueForm from "./components/tenant/AddIssueForm";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LeaseApplication from "./components/tenant/LeaseApplication/index";
import LeaseAgreementContract from "./components/tenant/LeaseAgreementContract/index";
import "./App.css";

import * as ROUTES from "./constants/routes";
import { withAuthentication } from "./components/Session";

const App = () => (
  <Router>
    <LastLocationProvider>
    <>
      <MenuAppBar />
      {/* Authentication/Account Related */}
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.RENTER_SIGNUP} component={RenterSignUp} />
      <Route exact path={ROUTES.OWNER_SIGNUP} component={PropertyOwnerSignup} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route exact path={ROUTES.ACCOUNT} component={Account} />

      {/* Dashboard Views */}
      <Route exact path={ROUTES.TENANT_DASHBOARD} component={TenantDashWithFirebase} />
      <Route exact path={ROUTES.OWNER_DASHBOARD} component={PropertyDash} />

      {/* Property Owner Routes */}
      <Route exact path={ROUTES.PROPERTY_CARD} component={PropertyCard} />
      <Route exact path={ROUTES.ADD_TENANT} component={AddTenantForm} />
      <Route exact path={ROUTES.EDIT_TENANT} component={EditTenantForm} />
      <Route exact path={ROUTES.TENANT_CARD} component={TenantCard} />
      <Route exact path={ROUTES.ADD_PROPERTY} component={AddPropertyForm} />
      <Route exact path={ROUTES.EDIT_PROPERTY} component={EditPropertyForm} />
      <Route exact path={ROUTES.VENDOR_CARD} component={VendorCard} />
      <Route exact path={ROUTES.ADD_VENDOR} component={AddVendorForm} />
      <Route exact path={ROUTES.EDIT_VENDOR} component={EditVendorForm} />
      <Route exact path={ROUTES.TENANT_ADDRESSBK} component={TenantAddressBk} />
      <Route exact path={ROUTES.VENDOR_ADDRESSBK} component={VendorAddressBK} />

      {/* Tenant Routes */}
      <Route exact path={ROUTES.RENT_RECEIPTS} component={RentReceipts} />
      <Route exact path={ROUTES.ADD_ISSUE_FORM} component={AddIssueForm} />
      {/* <Route exact path={ROUTES.LEASE_APPLICATION} component={LeaseApplication} />
      <Route exact path={ROUTES.LEASE_AGREEMENT_CONTRACT} component={LeaseAgreementContract} /> */}

      {/* Misc */}
      <Route exact path={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} />

      {/* Hold for Stretch */}
      <Route path="/manager-login" component={ManagerLogin} />
      <Route path="/manager-dash" component={ManagerDash} />
      <Route path="/add-manager" component={addManagerForm} />
      <Route path="/manager-profile/:id" component={ManagerCard} />
    </>
    </LastLocationProvider>
  </Router>
);

export default withAuthentication(App);
