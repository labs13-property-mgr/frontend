import React, { useState, useEffect } from "react";
import { Component } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { withAuthorization } from "../../Session";
import { compose } from "recompose";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

import * as ROLES from "../../../constants/roles";

import TenantUserMenu from "../../SideMenu/TenantUserMenu";

const drawerWidth = 240;

const styles = theme => ({
  mainContainer: {
    display: "block"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: drawerWidth
    }
  },

  dashboard: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "1.5rem"
    }
  },

  tablePageContainer: {
    margin: "2rem"
  },
  optionsIcon: {
    color: "grey",
    "&:hover": {
      color: "#008c3a"
    }
  },
  headerLayout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%"
  },
  addIcon: {
    color: "black",
    "&:hover": {
      color: "#008c3a"
    }
  },
  backButton: {
    "&:hover": {
      color: "#008c3a",
      backgroundColor: "transparent"
    }
  },
  h1: {
    fontSize: "2.4rem",
    marginBottom: "2rem",
    marginTop: "2rem"
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 500
  }
});

class RentReceipts extends Component {
  state = {
    tenants: [],
    users: [],
    user: {},
    anchorEl: null,
    clickedButton: null,
    currentRow: [],
    data: []
  };


  setupTenants = tenants => {
    const usersData = this.state.user;

    this.setState({
      tenants: tenants.filter(tenant => tenant.owner_id === usersData.uid)
    });
    this.setState({
      data: this.state.tenants.map(tenant => {
        return [
          tenant.id,
          `${tenant.First_name} ${tenant.Last_name}`,
          tenant.phone,
          tenant.email,
          `${
            tenant.active_tenant
              ? "Active Tenant"
              : "Inactive - No Property Assigned"
          }`
        ];
      })
    });
  };

  goBack = () => {
    this.props.history.push("/owner-dash");
  };

  render() {
    const columns = [
      {
        name: "id",
        label: "Id",
        options: {
          display: false,
          filter: false,
          sort: false
        }
      },
      {
        name: "name",
        label: "Title",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "int",
        label: "Date Created",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "options",
        label: "MORE",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div>
                <Tooltip title="View options" placement="left-start">
                  <Icon
                    className={this.props.classes.optionsIcon}
                    fontSize="large"
                    aria-haspopup={Boolean(this.state.anchorEl)}
                    onClick={e => {
                      this.setState({
                        currentRow: tableMeta.rowData,
                        anchorEl: e.currentTarget
                      });
                      console.log(this.state);
                    }}
                  >
                    more_horiz
                  </Icon>
                </Tooltip>
              </div>
            );
          }
        }
      }
    ];

    const options = {
      filterType: "textField",
      responsive: "stacked",
      fixedHeader: true,
      print: false,
      selectableRows: false,
      download: false,
      viewColumns: false
    };

    return (
      <div className={this.props.classes.mainContainer}>
        <TenantUserMenu />
        <main className={this.props.classes.content}>
          <div className={this.props.classes.dashboard}>
            <div className={this.props.classes.tablePageContainer}>
              <Button
                onClick={this.goBack}
                className={this.props.classes.backButton}
              >
                <Icon fontSize="small">arrow_back_ios</Icon>
                BACK TO DASHBOARD
              </Button>
              <div className={this.props.classes.headerLayout}>
                <Typography variant="h1" className={this.props.classes.h1}>
                  Rent Receipts
                </Typography>
                <Tooltip title="Add a new tenant" placement="left">
                  <Link to="/add-tenant">
                    <Icon
                      className={this.props.classes.addIcon}
                      fontSize="large"
                    >
                      person_add
                    </Icon>
                  </Link>
                </Tooltip>
              </div>
              <MUIDataTable
                data={this.state.data}
                columns={columns}
                options={options}
              />
              <Menu
                anchorEl={this.state.anchorEl}
                keepMounted
                open={this.state.anchorEl ? true : null}
                onClose={e => {
                  this.setState({
                    anchorEl: null
                  });
                }}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
              >
                
              </Menu>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.TENANT];

export default compose(
  withStyles(styles),
  withAuthorization(condition)
)(RentReceipts);