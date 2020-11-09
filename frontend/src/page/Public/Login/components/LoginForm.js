import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import CustomField from "../../../../components/CustomField/CustomField";
import {
  login,
  facebookLogin,
  googleLogin,
} from "../../../../redux/actions/auth";
import styles from "./styles";
const validateForm = Yup.object().shape({
  username: Yup.string().required("User name is not empty"),
  // .min(5, "Username must have min 5 characters")
  // .max(16, "Username have max 16 characters"),
  password: Yup.string()
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    //   "Password must have minimum 8 characters, at least one uppercase letter, one lowercase letter and one number"
    // )
    .required("Password is not empty"),
  // .min(8, "Password have min 8 characters")
  // .max(32, "Password have max 32 characters"),
});

function LoginForm(props) {
  const {
    isAuthenticated,
    user,
    redirect,
    classes,
    history,
    resetForm,
    setSubmitting,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && redirect) {
      if (user && user.role === "superadmin")
        return history.push("/admin/dashboard");
      return history.push("/");
    }
  }, [isAuthenticated, user, redirect]);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validateForm}
      onSubmit={(values) => {
        dispatch(login(values));
        resetForm({});
        setSubmitting(false);
      }}
    >
      {(propsForm) => (
        <Form className={classes.form}>
          <Typography className={classes.title} variant="h2">
            Sign in
          </Typography>

          <div className={classes.socialLogin}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              // onSuccess={dispatch(googleLogin)}
              // onFailure={dispatch(googleLogin)}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  fullWidth
                  variant="contained"
                  style={{
                    borderRadius: 0,
                    background: "#fff",
                    color: "#de5246",
                    marginBottom: 10,
                    height: 60,
                    fontSize: "calc(.27548vw + 12.71074px)",
                    fontWeight: 700,
                  }}
                >
                  Login With Google
                </Button>
              )}
            />
            <FacebookLogin
              buttonStyle={{ width: "100%", height: 60 }}
              appId="707524936551493"
              fields="name,email,picture"
              callback={dispatch(facebookLogin)}
            />
          </div>

          <div className={classes.fields}>
            <CustomField
              className={classes.textField}
              label="User name"
              name="username"
              type="text"
              variant="outlined"
            />
            <CustomField
              className={classes.textField}
              label="Password"
              name="password"
              type="password"
              variant="outlined"
            />
          </div>

          <Button
            className={classes.loginButton}
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            disabled={!propsForm.isValid || !propsForm.dirty}
          >
            Login now
          </Button>
          <Typography className={classes.register} variant="body1">
            Don't have an account?
            <Link className={classes.registerUrl} to="/register">
              register
            </Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user,
});
export default withStyles(styles)(connect(mapStateToProps)(LoginForm));
