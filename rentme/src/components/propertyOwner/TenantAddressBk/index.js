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

<<<<<<< HEAD
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

=======
import { withAuthorization } from "../../Session";
import { compose } from "recompose";

const styles = {
>>>>>>> 2c39416b81b695563b56fb0230cd0017f9ea4546
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
  }
});

class TenantAddressBk extends Component {
  state = {
    tenants: [],
    anchorEl: null,
    clickedButton: null,
    currentRow: []
  };

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/tenant";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          tenants: res.data
        });
      })
      .catch(err => console.log("Crap!", err));
  }

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
        name: "address",
        label: "ADDRESS",
        options: {
          filter: true,
          sort: false
        }
      },
      {
        name: "options",
        label: "MORE",
        options: {
          filter: true,
          sort: false,
          empty: true,
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
      filterType: "dropdown",
      responsive: "stacked",
      fixedHeader: true,
      print: false,
      selectableRows: false,
      download: false,
      viewColumns: false
    };

    const data = this.state.tenants.map(tenant => {
      return [
        tenant.id,
        `${tenant.firstName} ${tenant.lastName}`,
        tenant.phone,
        tenant.email,
        tenant.address
      ];
    });

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
                <h1>Tenant Address Book</h1>
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
              <MUIDataTable data={data} columns={columns} options={options} />
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
                      this.props.history.push(
                        `/tenant-card/${this.state.currentRow[0]}`
                      );
                    }}
                  >
                    Leasing Documents
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      this.props.history.push(
                        `/edit-tenant/${this.state.currentRow[0]}`
                      );
                    }}
                  >
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


const condition = authUser => !!authUser

export default compose(
  withStyles(styles),
  withAuthorization(condition),
)(TenantAddressBk);
