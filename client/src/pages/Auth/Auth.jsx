import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Input,
  Typography,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import {
  Facebook,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useStyles from "./styles";
import arvinLogo from "../../images/logo/logo-arvin.png";
import googleIcon from "../../images/logo/icons8-google.svg";
import {
  authStatus,
  loginUserAsync,
  registerUserAsync,
} from "../../features/auth/authSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "./yup.schema";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loadingStatus = useSelector(authStatus);
  const [isRegister, setIsRegister] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: isRegister
      ? yupResolver(registerSchema)
      : yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleIsRegister = () => setIsRegister((isRegister) => !isRegister);

  const submitHandler = (data) => {
    if (isRegister) {
      dispatch(registerUserAsync({ data, history }));
    } else {
      dispatch(loginUserAsync({ data, history }));
    }
    // reset();
  };

  // googleIcon
  const Google = () => (
    <div className={classes.googleIcon}>
      <img src={googleIcon} alt="google icon" />
    </div>
  );

  return (
    <Container className={classes.root}>
      <Grid container justify="center" className={classes.mainContainer}>
        <Grid item md={4} className={classes.socialMediaContainer}>
          <Box
            display="flex"
            flexDirection="column"
            align="center"
            justifyContent="center"
          >
            <div className={classes.logoContainer}>
              <img className={classes.logo} src={arvinLogo} alt="arvin logo" />
              <Typography
                className={classes.socialMediaTitle}
                variant="h6"
                component="h2"
              >
                Login using social media to get quick access
              </Typography>
            </div>
            <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="contained"
              disableElevation
            >
              <Button disabled startIcon={<Facebook />}>
                Sign in with facebook
              </Button>
              <Button disabled startIcon={<Twitter />}>
                Sign in with twitter
              </Button>
              <Button startIcon={<Google />}>Sign in with google</Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item md={6} className={classes.formContainer}>
          <div className={classes.formInputContainer}>
            <div className={classes.formRegisterTitle}>
              {isRegister ? (
                <>
                  <Typography variant="h4" gutterBottom>
                    Welcome To My Blog
                  </Typography>
                  <Typography color="textSecondary" variant="h6" component="p">
                    Please Register to create your own posts, like and comments
                    !!
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4" gutterBottom>
                    Welcome Back
                  </Typography>
                  <Typography color="textSecondary" variant="h6" component="p">
                    Please Login to continue
                  </Typography>
                </>
              )}
            </div>

            <form
              className={classes.form}
              autoComplete="off"
              onSubmit={handleSubmit(submitHandler)}
            >
              {isRegister && (
                <div className={classes.formRegisterContainer}>
                  <Controller
                    name="firstName"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <FormControl {...field}>
                        <TextField
                          size="small"
                          error={!!errors.firstName}
                          id="firstName"
                          label="First Name"
                          name="firstName"
                          helperText={
                            errors.firstName ? errors.firstName?.message : null
                          }
                        />
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="lastName"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <FormControl {...field}>
                        <TextField
                          error={!!errors.lastName}
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          size="small"
                          helperText={
                            errors.lastName ? errors.lastName?.message : null
                          }
                        />
                      </FormControl>
                    )}
                  />
                </div>
              )}
              <Controller
                name="email"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <FormControl {...field} fullWidth>
                    <TextField
                      error={!!errors.email}
                      id="email"
                      label="Email"
                      name="email"
                      size="small"
                      helperText={errors.email ? errors.email?.message : null}
                    />
                  </FormControl>
                )}
              />
              <Controller
                name="password"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <FormControl
                    {...field}
                    className={clsx(classes.margin, classes.textField)}
                    variant="standard"
                    fullWidth
                  >
                    <Input
                      id="password"
                      name="password"
                      label="Password"
                      size="small"
                      error={!!errors.password}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <span
                      className={classes.passwordHelperText}
                      style={{
                        color: errors.password ? "red" : "blue",
                      }}
                    >
                      {errors.password
                        ? errors.password?.message
                        : "Password must be at least 8 characters."}
                    </span>
                  </FormControl>
                )}
              />
              {isRegister && (
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl {...field} fullWidth>
                      <TextField
                        error={!!errors.confirmPassword}
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        size="small"
                        helperText={
                          errors.confirmPassword
                            ? errors.confirmPassword?.message
                            : null
                        }
                      />
                    </FormControl>
                  )}
                />
              )}
              <div className={classes.submitContainer}>
                <Button
                  className={classes.formSubmitButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  {isRegister ? "Register Now" : "LOGIN WITH EMAIL"}
                </Button>
                {isRegister ? (
                  <span>
                    Already have an account ?
                    <Button
                      onClick={handleIsRegister}
                      variant="text"
                      color="primary"
                      size="small"
                    >
                      Log In
                    </Button>
                  </span>
                ) : (
                  <span>
                    Don't have an account?
                    <Button
                      onClick={handleIsRegister}
                      variant="text"
                      color="primary"
                      size="small"
                    >
                      Register Now.
                    </Button>
                  </span>
                )}
              </div>
            </form>
          </div>
          {loadingStatus === "loading" && <LinearProgress />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Auth;
