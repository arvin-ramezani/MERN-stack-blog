import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    // height: "100vh",
    marginTop: theme.spacing(5),
    justifyContent: "center",
    alignItems: "center",

    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),

      // marginBottom: theme.spacing(2),
      // autoComplete: "off",
    },

    "& .MuiButtonGroup-grouped": {
      fontSize: ".7rem",
      marginBottom: theme.spacing(3),
      margin: "0 auto",
      height: theme.spacing(5),
      width: "80%",
      [theme.breakpoints.up("md")]: {
        width: "300px",
      },
    },
    "& .MuiButtonGroup-grouped:disabled": {
      color: "rgb(0 0 0 / 54%)",
      backgroundColor: "rgb(173 199 210 / 39%)",
      cursor: "no-drop",
    },

    "& .MuiInput-formControl": {
      marginBottom: theme.spacing(2),
    },
  },
  mainContainer: {
    margin: "auto .8rem",
  },
  googleIcon: {
    "& img": {
      width: "20px",
      height: "20px",
    },
  },
  socialMediaContainer: {
    backgroundColor: "#2d324e",
    // paddingTop: theme.spacing(5),
  },
  logo: {
    width: "200px",
    height: "200px",
  },
  socialMediaTitle: {
    // color: theme.palette.secondary,
    color: "#ccc",
    marginBottom: theme.spacing(2),
    // margin: "2rem 3rem 3rem",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      // width: "50%",
    },
  },
  formRegisterContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      gap: theme.spacing(4),
      flexDirection: "row",
    },
  },
  formRegisterTitle: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      "& .MuiTypography-root": {
        fontSize: "1.5rem",
      },
      "& .MuiTypography-h6": {
        fontSize: "1.2rem",
      },
    },
  },
  formInputContainer: {
    // width: "600px",
    // paddingTop: theme.spacing(0),
    // paddingTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formPaper: {},
  form: {
    // background: "#ccc",
    // padding: theme.spacing(5),
  },
  submitContainer: {
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    gap: "2rem",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    "& > span": {
      [theme.breakpoints.down("md")]: {
        fontSize: ".8rem",
      },
    },
  },
  passwordHelperText: {
    fontSize: ".8rem",
    [theme.breakpoints.up("md")]: {},
  },
  // formSubmitButton: {
  // },
}));
