import React from "react";
import { Divider, Typography, Link } from "@material-ui/core";
import useStyles from "./styles";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.copyright} variant="body1">
        &copy; FEDN36P2
      </Typography>
      <Typography variant="caption">
        {t("public.home.footer")} |{" "}
        <Link href="#" target="_blank" rel="noopener">
          Me
        </Link>
      </Typography>
    </div>
  );
}
