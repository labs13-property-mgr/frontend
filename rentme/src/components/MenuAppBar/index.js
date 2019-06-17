import React from "react";
import { Link } from "react-router-dom";
/*import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Logo from "../logo.png";
*/import "./nav.css";

import SignOut from '../SignOut';
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

/*const useStyles = makeStyles(theme => ({
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

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleChange(event) {
    setAuth(event.target.checked);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
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
            <img className="logo" src={Logo} alt="rentme logo" />
            <Typography variant="h6" className={classes.title}>
              RentMe
            </Typography>
             {auth && ( 
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
                  {!localStorage.getItem("token") ? (
                    <div>
                      <MenuItem onClick={handleClose}>Home</MenuItem>
                    </div>
                  ) : (
                    <div>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem><SignOut /></MenuItem>
                    </div>
                  )}
                </Menu>
              </div>
             )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
*/

const MenuAppBar = ({ authUser }) => (
<><AuthUserContext.Consumer>{authUser ? <MenuAppBarAuth /> : <MenuAppBarNonAuth />}</AuthUserContext.Consumer></>
)

const MenuAppBarAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOut />
    </li>
  </ul>
)

const MenuAppBarNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LOGIN}>Log In</Link>
    </li>
  </ul>
)

export default MenuAppBar