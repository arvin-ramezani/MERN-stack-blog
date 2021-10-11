import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  card: {
    // width: "250px",
    margin: "0 auto",
    height: "100%",
  },
  actionButtonGroup: {
    display: "flex",
  },
  editButton: {
    flex: 1,
  },
  cardFooter: {
    borderTop: "1px solid black",
    padding: ".5rem 1rem 1.3rem",
    color: theme.palette.primary.dark,
    "& .MuiLink-button": {
      margin: "0 .3rem",
    },
    "& span:hover": {
      backgroundColor: "ccc",
      // border
    },
  },
}));
