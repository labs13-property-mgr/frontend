import React, { useState, useEffect } from "react";
import { Component } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const styles = {
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
  }
};

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
                {/* <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                onClick={() => {
                  props.history.push(`/tenant-card/${tableMeta.rowData[0]}`);
                }}
              > */}
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
                {/* <Button
                  aria-haspopup={Boolean(this.state.anchorEl)}
                  onClick={e => {
                    this.setState({
                      currentRow: tableMeta.rowData,
                      anchorEl: e.currentTarget
                    });
                  }}
                >
                  View Details
                </Button> */}
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
        `${tenant.First_name} ${tenant.Last_name}`,
        tenant.phone,
        tenant.email,
        tenant.address
      ];
    });

    // const IconLink = props => {
    //   return <Icon component="a" {...props} />;
    // };

    return (
      <div className={this.props.classes.tablePageContainer}>
        <div className={this.props.classes.headerLayout}>
          <h1>Tenant Address Book</h1>
          <Tooltip title="Add a new tenant" placement="left">
            <Link to="/add-tenant">
              <Icon className={this.props.classes.addIcon} fontSize="large">
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
    );
  }
}

export default withStyles(styles)(TenantAddressBk);
