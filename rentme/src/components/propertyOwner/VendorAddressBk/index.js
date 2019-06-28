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
import { compose } from "recompose";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

import { withAuthorization } from "../../Session";
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

class VendorAddressBk extends Component {
  state = {
    vendors: [],
    users: [],
    user: {},
    anchorEl: null,
    clickedButton: null,
    currentRow: [],
    data: []
  };

  setupVendors = vendors => {
    const usersData = this.state.user;

    this.setState({
      vendors: vendors.filter(vendor => vendor.owner_id === usersData.uid)
    });
    this.setState({
      data: this.state.vendors.map(vendor => {
        return [
          vendor.id,
          vendor.company_name,
          vendor.phone,
          vendor.email,
          vendor.address
        ];
      })
    });
  };

  getVendors = () => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/vendor")
      .then(res => {
        const vendors = res.data;
        this.setupVendors(vendors);
        this.props.history.push(`/vendor-addbook`);
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
        this.getVendors();
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  deleteVendors = id => {
    return axios
      .delete(`https://rent-me-app.herokuapp.com/api/vendor/${id}`)
      .then(res => {
        const vendors = res.data;
        this.setState({ vendors });
      })
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteVendor = vendorId => {
    this.deleteVendors(vendorId);
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
        name: "company_name",
        label: "COMPANY NAME",
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
        name: "address",
        label: "ADDRESS",
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
                <Tooltip title="View options" placement="right-start">
                  <Icon
                    className={this.props.classes.optionsIcon}
                    fontSize="large"
                    aria-haspopup={Boolean(this.state.anchorEl)}
                    onClick={e => {
                      this.setState({
                        currentRow: tableMeta.rowData,
                        anchorEl: e.currentTarget
                      });
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

    // const data = this.state.vendors.map(vendor => {
    //   return [
    //     vendor.id,
    //     vendor.company_name,
    //     vendor.phone,
    //     vendor.email,
    //     vendor.address
    //   ];
    // });

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
                  Vendor Address Book
                </Typography>
                <Tooltip title="Add a new vendor" placement="left">
                  <Link to="/add-vendor">
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
                        `/vendor-card/${this.state.currentRow[0]}`
                      );
                    }}
                  >
                    Full Profile
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      this.deleteVendor(this.state.currentRow[0]);
                    }}
                  >
                    Delete Vendor
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      this.props.history.push(
                        `/edit-vendor/${this.state.currentRow[0]}`
                      );
                    }}
                  >
                    Edit Vendor Information
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
)(VendorAddressBk);
