import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Portlet from "../../../../components/Portlet/Portlet";
import PortletContent from "../../../../components/PortletContent/PortletContent";
import styles from "./styles";

const ReservationsTable = ({ classes, className, reservations }) => {
  const { t, i18n } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };
  const rootClassName = classNames(classes.root, className);

  return (
    <Portlet className={rootClassName}>
      <PortletContent noPadding>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">{t("dashboard.movie")}</TableCell>
              <TableCell align="left">{t("dashboard.cinema")}</TableCell>
              <TableCell align="left">{t("dashboard.date")}</TableCell>
              <TableCell align="left">{t("dashboard.startAt")}</TableCell>
              <TableCell align="left">{t("dashboard.method")}</TableCell>
              <TableCell align="left">{t("dashboard.total")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reservation) => (
                <TableRow
                  className={classes.tableRow}
                  hover
                  key={reservation._id}
                >
                  <TableCell className={classes.tableCell}>
                    {reservation.movieId.title}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {reservation.cinemaId.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {new Date(reservation.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {reservation.startAt}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {reservation.paymentMethod}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {reservation.total}$
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          component="div"
          count={reservations.length}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </PortletContent>
    </Portlet>
  );
};
ReservationsTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  reservations: PropTypes.array.isRequired,
};

ReservationsTable.defaultProps = {
  reservations: [],
};

export default withStyles(styles)(ReservationsTable);
