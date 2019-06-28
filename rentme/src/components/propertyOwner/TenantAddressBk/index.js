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

import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";

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

class TenantAddressBk extends Component {
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
            tenant.active_tenant ? "Active" : "Inactive - No Property Assigned"
          }`
        ];
      })
    });
  };

  getTenants = () => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/tenant")
      .then(res => {
        const tenants = res.data;
        this.setupTenants(tenants);
        this.props.history.push(`/tenant-addbook`);
      })
      .catch(err => console.log("Crap!", err));
  };

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/user";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          users: res.data,
          user: res.data.find(
            user =>
              user.uid === JSON.parse(localStorage.getItem("authUser")).uid
          )
        });
        this.getTenants();
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  deleteTenants = id => {
    return axios
      .delete(`https://rent-me-app.herokuapp.com/api/tenant/${id}`)
      .then(res => {
        const tenants = res.data;
        this.setState({ tenants });
      })
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteTenant = tenantId => {
    this.deleteTenants(tenantId);
  };

  setActiveTenant = tenant => {
    this.setState({ activeTenant: tenant });
  };

  updateTenant = e => {
    e.preventDefault();
    this.setActiveTenant(this.state.tenant);
    this.props.history.push(`/edit-tenant/${this.state.currentRow[0]}`);
  };

  goBack = e => {
    this.props.history.goBack();
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
        label: "NAME",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "phone",
        label: "PHONE",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "email",
        label: "EMAIL",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "active_tenant",
        label: "TENANT STATUS",
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
        <OwnerUserMenu />
        <main className={this.props.classes.content}>
          <div className={this.props.classes.dashboard}>
            <div className={this.props.classes.tablePageContainer}>
              <Button
                onClick={this.goBack}
                className={this.props.classes.backButton}
              >
                <Icon fontSize="small">arrow_back_ios</Icon>
                BACK
              </Button>
              <div className={this.props.classes.headerLayout}>
                <Typography variant="h1" className={this.props.classes.h1}>
                  Tenant Address Book
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
                <div>
                  <MenuItem
                    onClick={e => {
                      this.props.history.push(
                        `/tenant-card/${this.state.currentRow[0]}`
                      );
                    }}
                  >
                    Full Profile
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      this.deleteTenant(this.state.currentRow[0]);
                    }}
                  >
                    Delete Tenant
                  </MenuItem>
                  <MenuItem onClick={this.updateTenant}>
                    Edit Information
                  </MenuItem>
                </div>
              </Menu>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.OWNER];

export default compose(
  withStyles(styles),
  withAuthorization(condition)
)(TenantAddressBk);
