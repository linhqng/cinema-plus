import React from "react";
import classnames from "classnames";
import { Rating } from "@material-ui/lab";
import {
  Box,
  Typography,
  Button,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { textTruncate } from "../../../../utils/utils";
import { Link } from "react-router-dom";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import styles from "./styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(styles);

const StyledRating = withStyles({
  iconFilled: {
    color: "#fff",
  },
  iconEmpty: {
    color: "#fff",
  },
})(Rating);

const MovieBanner = (props) => {
  const { t, i18n } = useTranslation();
  const { movie, fullDescription } = props;
  const classes = useStyles(props);
  const { t } = useTranslation();
  if (!movie) return null;

  return (
    <div className={classes.movieHero}>
      <div className={classes.infoSection}>
        <header className={classes.movieHeader}>
          {fullDescription && (
            <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
              {movie.genre.split(",").map((genre, index) => (
                <Typography
                  key={`${genre}-${index}`}
                  className={classes.tag}
                  variant="body1"
                  color="inherit"
                >
                  {genre}
                </Typography>
              ))}

              <StyledRating
                value={4}
                readOnly
                size="small"
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Box>
          )}
          <Typography
            className={classes.movieTitle}
            variant="h1"
            color="inherit"
          >
            {movie.title}
          </Typography>
          <Typography
            className={classes.descriptionText}
            variant="body1"
            color="inherit"
          >
            {textTruncate(movie.description, 450)}
          </Typography>
          <Typography className={classes.director} variant="h4" color="inherit">
            {t("public.home.by")}: {movie.director}
          </Typography>
          <Typography
            className={classes.duration}
            variant="body1"
            color="inherit"
          >
            {movie.duration} {t("public.home.min")}
          </Typography>
          <Typography className={classes.genre} variant="body1" color="inherit">
            {movie.genre}
          </Typography>
        </header>
      </div>
      <div
        className={classes.blurBackground}
        style={{
          backgroundImage: `url(${movie.image})`,
        }}
      />
      <div className={classes.movieActions}>
        {fullDescription ? (
          <Link to={`booking/${movie._id}`} style={{ textDecoration: "none" }}>
            <Button variant="contained" className={classes.button}>
              {t("public.home.buyticket")}
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        ) : (
          <Link to={`movie/${movie._id}`} style={{ textDecoration: "none" }}>
            <Button className={classnames(classes.button, classes.learnMore)}>
              {t("public.home.learnmore")}
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieBanner;
