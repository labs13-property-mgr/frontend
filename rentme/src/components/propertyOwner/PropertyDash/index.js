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
import OwnerUserMenu from "../../SideMenu/OwnerUserMenu";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";
import placeholer from "../../../placeholderImages/modernHouse.png";
import "../../imageMediaQueries.css";

import { withAuthorization } from "../../Session";
import * as ROLES from "../../../constants/roles";

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
  },
  h1: {
    fontSize: "2.4rem",
    marginBottom: "2rem"
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 500
  },
  rentSpan: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "-30px"
  },
  cardSpan: {
    display: "flex",
    alignItems: "center",
    marginTop: "-30px",
    marginLeft: "31px"
  },
  cardStyle: {
    boxShadow: "0px 1px 3px 1px #ccc",
    webkitTransitionDuration: "0.3s",
    mozTransitionDuration: "0.3s",
    oTransitionDduration: "0.3s",
    transitionDuration: "0.3s",
    "&:hover": {
      boxShadow: "1px 2px 4px 2px #00000050",
      webkitTransitionDuration: "0.2s",
      mozTransitionDuration: "0.2s",
      oTransitionDuration: "0.2s",
      transitionDuration: "0.2s"
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
  const [emptyState, setEmptyState] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

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
      .get(
        `https://rent-me-app.herokuapp.com/api/user/${
        JSON.parse(localStorage.getItem("authUser")).uid
        }/properties`
      )
      .then(res => {
        setProperties(res.data);
        // console.log(res.data);

        // console.log(res.data);
        // console.log(props);
      })
      .catch(err => console.log("Crap!", err));
    let timer1 = setTimeout(() => setShowLoading(true), 60);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  function handleChangePage(event, newPage) {
    // console.log(newPage);
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
            <Typography className={classes.h1} variant="h1">
              Property Owner Dashboard
            </Typography>
            {/*Dashboard content */} {/* list of owner's properties */}
            <div className={classes.headerPlusSearch}>
              <Typography className={classes.h2} variant="h2">
                Properties
              </Typography>
              <div className={classes.dashboardSearch}>
                <Icon>search</Icon>
                <Input
                  className={classes.searchInput}
                  inputTypeSearch
                  placeholder="Search"
                  variant="outlined"
                  onChange={handleKeyDown}
                />
              </div>
            </div>
            <br />
            <Grid container className={classes.propertyCards} spacing={4}>
              {showLoading && properties.length === 0 && (
                <div>
                  Welcome! New to RentMe? Get started by{" "}
                  <Link to="/add-property">adding your first Property</Link>
                </div>
              )}
              {properties &&
                properties
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
                                
                                <div className="propertyDashImageCardHoalder">
                                  {property.image_url === null ? (
                                    <img
                                      // className={this.props.classes.propertyImage}
                                      id="propertyDashPropertyImage"
                                      src={placeholer}
                                      alt="house placeholder"
                                    />
                                  ) : (
                                    <img
                                      // className={this.props.classes.propertyImage}
                                      id="propertyDashPropertyImage"
                                      src={property.image_url}
                                      alt="rental house photo"
                                    />
                                  )}
                                </div>
                                <p>
                                  Name: {property && property.property_name}
                                </p>
                                <p>Address: {property && property.address}</p>
                                <span className={classes.cardSpan}><p>Unit: </p>&nbsp;<Typography color="textSecondary">{property && property.unit}</Typography></span>
                                <span className={classes.rentSpan}><h4>Rent Rate: </h4>&nbsp;<p>${property && property.rent}</p></span>
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

const condition = authUser => authUser && !!authUser.roles[ROLES.OWNER];

export default withAuthorization(condition)(PropertyDash);
