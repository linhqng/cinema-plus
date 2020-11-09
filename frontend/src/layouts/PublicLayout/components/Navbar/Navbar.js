import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../../redux/actions/auth";
import classnames from "classnames";
import { withStyles, Typography, List, ListItem } from "@material-ui/core";

// Component styles
import styles from "./styles";
import UserPopover from "./components/UserPopover/UserPopover";

const Navbar = ({ classes, isAuth, user, logout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPos, setScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScrollPos(window.pageYOffset);
  };
  return (
    <Fragment>
      <nav
        className={classnames({
          [classes.navbar]: true,
          [classes.navbarColor]: scrollPos > 30,
        })}
      >
        <Link className={classes.logoLink} to="/">
          <Typography className={classes.logo} variant="h2">
            Cinema +
          </Typography>
        </Link>
        <div className={classes.navLinks}>
          <Link className={classes.navLink} to="/">
            Home
          </Link>
          <Link className={classes.navLink} to="/movie/category/nowShowing">
            Now Showing
          </Link>
          <Link className={classes.navLink} to="/movie/category/comingSoon">
            Coming Soon
          </Link>
          <Link className={classes.navLink} to="/cinemas">
            Cinemas
          </Link>
        </div>

        <div className={classes.navAccount}>
          <UserPopover logout={logout}>
            <List component="nav">
              {user && (
                <ListItem>
                  <Link
                    className={classes.navLink}
                    to={
                      user.role !== "guest"
                        ? "/admin/dashboard"
                        : "/mydashboard"
                    }
                  >
                    Dashboard
                  </Link>
                </ListItem>
              )}

              {isAuth ? (
                <ListItem>
                  <Link className={classes.navLink} onClick={logout} to="/">
                    Logout
                  </Link>
                </ListItem>
              ) : (
                <ListItem>
                  <Link className={classes.navLink} to="/login">
                    Login
                  </Link>
                </ListItem>
              )}
            </List>
          </UserPopover>
        </div>

        <div className={classes.navMobile}>
          <div
            className={classes.navIcon}
            onClick={() => setShowMenu(!this.state.showMenu)}
          >
            <div
              className={classnames(
                classes.navIconLine,
                classes.navIconLine__left
              )}
            />
            <div className={classes.navIconLine} />
            <div
              className={classnames(
                classes.navIconLine,
                classes.navIconLine__right
              )}
            />
          </div>
        </div>
      </nav>
      <div
        className={classnames({
          [classes.navActive]: showMenu,
          [classes.nav]: true,
        })}
      >
        <div className={classes.navContent}>
          <div className={classes.currentPageShadow}>Movies</div>
          <ul
            className={classes.innerNav}
            onClick={() => setShowMenu(!this.state.showMenu)}
          >
            <li className={classes.innerNavListItem}>
              <Link className={classes.innerNavLink} to="/">
                Home
              </Link>
            </li>
            <li className={classes.innerNavListItem}>
              <Link
                className={classes.innerNavLink}
                to="/movie/category/nowShowing"
              >
                Now Showing
              </Link>
            </li>
            <li className={classes.innerNavListItem}>
              <Link
                className={classes.innerNavLink}
                to="/movie/category/comingSoon"
              >
                Coming Soon
              </Link>
            </li>
            <li className={classes.innerNavListItem}>
              <Link className={classes.innerNavLink} to="/cinemas">
                Cinemas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authState.isAuthenticated,
  user: state.authState.user,
});

export default connect(mapStateToProps, {
  logout,
})(withStyles(styles)(Navbar));
