import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  pleaseLogin: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    maxWidth: "400px",
    margin: "0 auto",
  },
  form: {
    padding: theme.spacing(3),
  },
  fileInput: {
    margin: "1rem 0",
    "& input": {},
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
}));
