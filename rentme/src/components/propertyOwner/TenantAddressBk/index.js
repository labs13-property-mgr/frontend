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

const styles = {
  optionsIcon: {
    color: "grey",
    "&:hover": {
      color: "#3F51B5"
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
    const endpoint = "https://rent-me-app.herokuapp.com/api/users";
    axios
      .get(endpoint)
      .then(res => {
        const tenantsData = res.data.filter(d => d.role === "tenant");
        this.setState({
          tenants: tenantsData
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
          display: false
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

    return (
      <div>
        <h1>Tenant Address Book</h1>
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
                  `/tenant-card/${this.state.currentRow[0]}`
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

// const TenantAddressBk = props => {
//   const [tenants, setTenants] = useState([]);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [rando, setRando] = React.useState(null);

//   function handleClick(event) {
//     setRando("Neil");
//     setAnchorEl(event.currentTarget);
//   }

//   function handleClose() {
//     setAnchorEl(null);
//   }

//   const columns = [
//     {
//       name: "id",
//       label: "Id",
//       options: {
//         display: false
//       }
//     },
//     {
//       name: "name",
//       label: "name",
//       options: {
//         filter: true,
//         sort: true
//       }
//     },
//     {
//       name: "phone",
//       label: "Phone",
//       options: {
//         filter: true,
//         sort: true
//       }
//     },
//     {
//       name: "email",
//       label: "Email",
//       options: {
//         filter: true,
//         sort: true
//       }
//     },
//     {
//       name: "address",
//       label: "Address",
//       options: {
//         filter: true,
//         sort: false
//       }
//     },
//     {
//       name: "",
//       options: {
//         filter: true,
//         sort: false,
//         empty: true,
//         customBodyRender: (value, tableMeta, updateValue) => {
//           return (
//             <div>
//               {/* <Button
//                 aria-controls="simple-menu"
//                 aria-haspopup="true"
//                 onClick={handleClick}
//                 // onClick={() => {
//                 //   props.history.push(`/tenant-card/${tableMeta.rowData[0]}`);
//                 // }}
//               > */}
//               <Button
//                 aria-controls="simple-menu"
//                 aria-haspopup="true"
//                 onClick={() => setRando("Neil")}
//               >
//                 View Details
//               </Button>
//               <Menu
//                 id="simple-menu"
//                 anchorEl={anchorEl}
//                 keepMounted
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem>Profile</MenuItem>
//                 <MenuItem>My account</MenuItem>
//                 <MenuItem onClick={handleClose}>Logout</MenuItem>
//               </Menu>
//             </div>
//           );
//         }
//       }
//     }
//   ];

//   const options = {
//     filterType: "dropdown",
//     responsive: "stacked",
//     fixedHeader: true,
//     print: false,
//     selectableRows: false,
//     download: false,
//     viewColumns: false
//   };

//   //   const options = {
//   //     filtering: true
//   //   };

//   const data = tenants.map(tenant => {
//     return [
//       tenant.id,
//       `${tenant.First_name} ${tenant.Last_name}`,
//       tenant.phone,
//       tenant.email,
//       tenant.address
//     ];
//   });

//   useEffect(() => {
//     axios
//       .get("https://rent-me-app.herokuapp.com/api/users")
//       .then(res => {
//         setTenants(res.data.filter(d => d.role === "tenant"));
//       })
//       .catch(err => console.log("Crap!", err));
//   }, []);

//   return (
//     <div>
//       <h1>Tenant Address Book</h1>
//       <MUIDataTable data={data} columns={columns} options={options} />
//     </div>
//   );
// };

// export default TenantAddressBk;
