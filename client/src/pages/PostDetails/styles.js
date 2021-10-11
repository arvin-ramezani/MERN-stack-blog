import { alpha, makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  gridContainer: {
    backgroundColor: alpha(theme.palette.common.white, 1),
    padding: theme.spacing(3),

    [theme.breakpoints.up("lg")]: {
      padding: "4rem 7rem",
    },
  },
  postTitle: {
    fontSize: "5rem",
  },
  postTags: {
    padding: theme.spacing(0.5),
    border: "1px solid grey",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    "& .MuiLink-button": {
      margin: "auto .6rem",
      [theme.breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
    },
  },
  postMessage: {
    marginTop: theme.spacing(5),
  },
  postMessageText: {
    textIndent: "1rem",
    lineHeight: "2.2",
    padding: "0 .4rem",
  },
  postCreator: {
    margin: "1rem auto",
    padding: theme.spacing(2),
  },
  postCreatorText: {
    marginLeft: theme.spacing(1),
    fontSize: "1.2rem",
    color: theme.palette.text.secondary,
  },
  postImage: {
    padding: theme.spacing(1),
    marginTop: "4rem",

    "& img": {
      width: "100%",
      height: "auto",
      borderRadius: "1rem",
    },
  },
}));
