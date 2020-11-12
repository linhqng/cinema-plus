import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Grid, Typography, Container } from "@material-ui/core";
import { getMyReservations } from "../../../redux/actions/reservation";
import ReservationTable from "./components/MyReservationTable";
import Account from "../../Admin/Account/Account";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "3rem",
    lineHeight: "3rem",
    textAlign: "center",
    textTransform: "capitalize",
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    fullWidth: { width: "100%" },
  },
}));

function MyDashboard(props) {
  const { user, reservations } = props;
  const classes = useStyles(props);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyReservations(user._id));
  }, [reservations.length]);
  return (
    <Container>
      <Grid container spacing={2}>
        {!!reservations.length && (
          <>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                variant="h2"
                color="inherit"
              >
                My Reservations
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ReservationTable reservations={reservations} />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            My Account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Account />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({ authState, reservationState }) => ({
  user: authState.user,
  reservations: reservationState.myReservations,
});
export default connect(mapStateToProps)(MyDashboard);
