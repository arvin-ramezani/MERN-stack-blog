import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: ".5rem",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-evenly",
    },
    alignItems: "center",
    paddingLeft: "0",
  },
  navbarLogo: {
    width: "100px",
    height: "auto",
    margin: ".25rem 0",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      height: "60px",
    },
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      gap: theme.spacing(2),
    },
    "& .MuiTypography-root": {
      fontSize: "1rem",
    },
  },
}));
