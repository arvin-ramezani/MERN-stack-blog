import useStyles from "./styles";
import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, userSelector } from "../../features/auth/authSlice";
import LOGO from "../../images/logo/memories-logo.png";
import { useSnackbar } from "notistack";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userSelector);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogOut = (e) => {
    dispatch(logOutUser());

    enqueueSnackbar("You are loged out successfully", {
      variant: "success",
    });

    history.push("/");
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <img className={classes.navbarLogo} src={LOGO} alt="logo" />
        </Link>
        {user ? (
          <>
            <div className={classes.profile}>
              <Avatar src="https://i.pravatar.cc/150" alt={user.firstName} />
              <Typography variant="h6" component="h4">
                {user.firstName} {user.lastName}
              </Typography>
            </div>
            <Button
              onClick={handleLogOut}
              disableElevation
              size="small"
              variant="contained"
              color="secondary"
            >
              Log Out
            </Button>
          </>
        ) : (
          <Button
            size="small"
            color="secondary"
            className={classes.navbarButton}
            variant="contained"
            component={Link}
            to="/auth"
          >
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
