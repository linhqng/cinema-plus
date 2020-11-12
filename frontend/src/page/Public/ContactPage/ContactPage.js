import React, { useEffect } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import CustomField from "../../../components/CustomField/CustomField";
import CustomUpLoad from "../../../components/CustomUpload/CustomUpload";
const ContactPage = ({ classes }) => {
  const { t, i18n } = useTranslation();
  return (
    <Grid
      container
      xs={12}
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          phone: "",
          password: "",
          image: null,
          policy: false,
        }}
        validationSchema={Yup.object().shape({
          // Validate form field
          name: Yup.string()
            .required(t("validate.nameRq"))
            .min(5, t("validate.nameMin")),
          username: Yup.string()
            .required(t("validate.usernameRq"))
            .min(5, t("validate.usernameMin"))
            .max(16, t("validate.usernameMax")),
          email: Yup.string()
            .email(t("validate.emailInvalid"))
            .required(t("validate.emailRq")),
          phone: Yup.string()
            .matches(/^(0)+([0-9]{9})\b$/, t("validate.phoneInvalid"))
            .required(t("validate.phoneRq")),
          password: Yup.string()
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              t("validate.passwordDesc")
            )
            .required(t("validate.passwordRq"))
            .min(8, t("validate.passwordMin"))
            .max(32, t("validate.passwordMax")),
          image: Yup.mixed().required(t("validate.avatarRq")),
          policy: Yup.boolean().oneOf([true], t("validate.policyRq")),
        })}
        onSubmit={(values) => {
          // dispatch(registerUser(values));
          // setSubmitting(false);
        }}
      >
        {(propsForm) => (
          <Form className={classes.form}>
            <Typography className={classes.title} variant="h2">
              {t("register.title")}
            </Typography>
            <Typography className={classes.subtitle} variant="body1">
              {t("register.desc")}
            </Typography>

            <div className={classes.fields}>
              <CustomField
                className={classes.textField}
                label={t("register.name")}
                name="name"
                variant="outlined"
              />
              <CustomField
                className={classes.textField}
                label={t("register.email")}
                name="email"
                variant="outlined"
              />
              <CustomField
                className={classes.textField}
                label={t("register.phone")}
                name="phone"
                variant="outlined"
              />
              <CustomField
                className={classes.textField}
                label="Message"
                name="password"
                variant="outlined"
                multiline
                rows={4}
                rowsMax={7}
                placeholder="Minimum 3 rows"
              />
              <CustomUpLoad
                name="image"
                className={classes.upload}
                label="Upload Avatar"
              />
            </div>

            <Button
              className={classes.registerButton}
              color="primary"
              size="large"
              variant="contained"
              disabled={!propsForm.isValid || !propsForm.dirty}
              type="submit"
            >
              {t("register.btn")}
            </Button>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};
export default withStyles(styles)(ContactPage);
