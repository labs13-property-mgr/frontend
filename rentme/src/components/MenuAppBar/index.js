import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Logo from "../logo.png";
import "./nav.css";

import SignOut from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    zIndex: 1300,
    position: "relative"
  },
  title: {
    flexGrow: 1
  },
  menuPopover: {
    marginTop: "2.2rem",
    marginLeft: "1.2rem"
  },
  menuItem: {
    color: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "#008c3a",
      textDecoration: "none"
    }
  }
});

const MenuAppBar = () => (
  <>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <MenuAppBarAuth /> : <MenuAppBarNonAuth />)}
    </AuthUserContext.Consumer>
  </>
);

const MenuAppBarAuth = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          />
          <div className="header-content">
            <div className="logo-content">
              <img className="logo" src={Logo} alt="rentme logo" />
              <Typography variant="h6">RentMe</Typography>
            </div>
            <div>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
                className={classes.menuPopover}
              >
                <div>
                  <Link to={ROUTES.ACCOUNT}>
                    <MenuItem className={classes.menuItem}>Account</MenuItem>
                  </Link>
                  <MenuItem className={classes.menuItem}>
                    <SignOut className={classes.menuItem} />
                  </MenuItem>
                </div>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};


const MenuAppBarNonAuth = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          />
          <div className="header-content">
            <div className="logo-content">
              <img className="logo" src={Logo} alt="rentme logo" />
              <Typography variant="h6">RentMe</Typography>
            </div>
            <div>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
                className={classes.menuPopover}
              >
                <div>
                  <Link to={ROUTES.LOGIN}>
                    <MenuItem>Log In</MenuItem>
                  </Link>
                </div>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
