import React from "react";
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

import SignOut from '../SignOut';
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));


const MenuAppBar = () => (
  <>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <MenuAppBarAuth /> : <MenuAppBarNonAuth />}
    </AuthUserContext.Consumer>
  </>
)


const MenuAppBarAuth = props => {
  const classes = useStyles();

  function handleClose() {
    setAnchorEl(null);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

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
            <img className="logo" src={Logo} alt="rentme logo" />
              <Typography variant="h6" >
                RentMe
              </Typography>
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
                  >
                  <div>
                    <Link to={ROUTES.ACCOUNT}><MenuItem>Account</MenuItem></Link>
                    <MenuItem><SignOut /></MenuItem>
                  </div>
                </Menu>
              </div>
          </div>
      </Toolbar>
    </AppBar>
  </div>
}


const MenuAppBarNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LOGIN}><MenuItem>Log In</MenuItem></Link>
    </li>
  </ul>
)

export default MenuAppBar