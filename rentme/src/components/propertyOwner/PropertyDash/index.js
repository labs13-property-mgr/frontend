import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import TablePagination from "@material-ui/core/TablePagination";
import OwnerUserMenu from "../../SideMenu";
import Input from "@material-ui/core/Input";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  headerPlusSearch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  dashboardSearch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  searchInput: {
    border: "none",
    borderBottom: "1px solid black",
    fontSize: "1rem",
    "&:focus": {
      outline: "none"
    }
  },

  hide: {
    opacity: 0,
    pointerEvents: "none"
  },
  paginationWrapper: {
    display: "flex",
    justifyContent: "flex-end"
  },
  mainContainer: {
    display: "block"
  },

  test: {
    // border: "1px solid black"
  },
  propertyCards: {
    marginTop: "3rem"
  },
  dashboard: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "1.5rem"
    }
  },
  addLayout: {
    display: "flex",
    justifyContent: "space-between",
    width: "55%",
    alignItems: "center",
    paddingLeft: ".6rem"
  },
  addIcon: {
    color: "lightgrey",
    "&:hover": {
      color: "#008c3a"
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: drawerWidth
    }
  }
}));

const PropertyDash = props => {
  const { container } = props;
  const [properties, setProperties] = useState([]);
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  function handleKeyDown(e) {
    setSearchQuery(e.target.value);
  }

  function doesMatchSearchQuery(property) {
    if (searchQuery === "") {
      return true;
    }
    const expression = new RegExp(searchQuery, "i");
    return (
      searchQuery === "" ||
      property.property_name.match(expression) ||
      property.address.match(expression)
    );
  }

  useEffect(() => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/properties")
      .then(res => {
        setProperties(res.data);
        console.log(res.data);
      })
      .catch(err => console.log("Crap!", err));
  }, []);

  function handleChangePage(event, newPage) {
    console.log(newPage);
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setCardsPerPage(+event.target.value);
  }

  return (
    <>
      <div className={classes.mainContainer}>
        <OwnerUserMenu />
        <main className={classes.content}>
          <div className={classes.dashboard}>
            <h1>Property Owner Dashboard</h1>
            {/*Dashboard content */} {/* list of owner's properties */}
            <div className={classes.headerPlusSearch}>
              <h2>Properties</h2>
              <div className={classes.dashboardSearch}>
                <Icon fontSize="medium">search</Icon>
                <Input
                  className={classes.searchInput}
                  inputTypeSearch
                  placeholder="Search"
                  variant="outlined"
                  onChange={handleKeyDown}
                />
              </div>
            </div>
            <Grid container className={classes.propertyCards} spacing={4}>
              {properties
                .slice(
                  searchQuery ? 0 : page * cardsPerPage,
                  searchQuery
                    ? properties.length
                    : page * cardsPerPage + cardsPerPage
                )
                .map(property => {
                  return (
                    doesMatchSearchQuery(property) && (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={4}
                        key={property && property.id}
                      >
                        <Link to={`/property-card/${property.id}`}>
                          <Card className={classes.cardStyle}>
                            <CardContent>
                              <p>Name: {property && property.property_name}</p>
                              <p>Address: {property && property.address}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      </Grid>
                    )
                  );
                })}
            </Grid>
          </div>
          <TablePagination
            className={searchQuery ? classes.hide : classes.paginationWrapper}
            count={properties.length}
            rowsPerPage={cardsPerPage}
            rowsPerPageOptions={[]}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={handleChangePage}
          />
        </main>
        {/* </Container> */}
      </div>
    </>
  );
};

export default PropertyDash;
