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

class VendorAddressBk extends Component {
  state = {
    vendors: [],
    anchorEl: null,
    clickedButton: null,
    currentRow: []
  };

  componentDidMount() {
    const endpoint = "https://rent-me-app.herokuapp.com/api/vendor";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          vendors: res.data
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
          filter: true,
          sort: false,
          empty: true,
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
      filterType: "dropdown",
      responsive: "stacked",
      fixedHeader: true,
      print: false,
      selectableRows: false,
      download: false,
      viewColumns: false
    };

    const data = this.state.vendors.map(vendor => {
      return [
        vendor.id,
        vendor.company_name,
        vendor.phone,
        vendor.email,
        vendor.address
      ];
    });

    return (
      <div className={this.props.classes.tablePageContainer}>
        <div className={this.props.classes.headerLayout}>
          <h1>Vendor Address Book</h1>
          <Tooltip title="Add a new vendor" placement="left">
            <Link to="/add-vendor">
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
                  `/vendor-card/${this.state.currentRow[0]}`
                );
              }}
            >
              Full Profile
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
    );
  }
}

export default withStyles(styles)(VendorAddressBk);
