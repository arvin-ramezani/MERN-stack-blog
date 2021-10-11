import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    padding: ".5rem 1rem",
    [theme.breakpoints.up("sm")]: {
      //   padding: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    "& nav": {
      width: "100%",
    },
    "& ul": {
      display: "flex",
      justifyContent: "space-evenly",
    },
  },
}));
