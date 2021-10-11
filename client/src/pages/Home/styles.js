import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    display: "flex",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  progress: {
    margin: "0 auto",
    color: "white",

    [theme.breakpoints.up("md")]: {
      transform: "scale(4)",
      margin: "5rem auto",
    },
  },
  searchContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      width: "270px",
    },

    "& .MuiFormControl-root": {
      margin: ".8rem 0",
    },
    "& button": {
      marginTop: theme.spacing(2),
    },
  },
}));
