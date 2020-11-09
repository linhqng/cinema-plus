import { Badge, Button, IconButton, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect } from "react";
import styles from "./styles";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
Topbar.propTypes = {};

function Topbar(props) {
  const {
    classes,
    ToolbarClasses,
    children,
    isSidebarOpen,
    onToggleSidebar,
  } = props;
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    changeLanguage("en");
  }, []);
  return (
    <div className={`${classes.root} , ${ToolbarClasses}`}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.brandWrapper}>
          <div className={classes.logo}>Cinema +</div>
          <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            onClick={onToggleSidebar}
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        {/* <NavLink className={classes.title} to="/">
          Cinema App
        </NavLink> */}

        {/* <IconButton
          className={classes.notificationsButton}
          onClick={() => console.log("Notification")}
        >
          <Badge badgeContent={4} color="primary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            
            <Button onClick={() => changeLanguage("vi")}>VIE</Button>
            <Button onClick={() => changeLanguage("en")}>ENG</Button>
          </div>
          <IconButton className={classes.signOutButton}>
            <InputIcon />
          </IconButton>
        </div>
      </Toolbar>
      {children}
    </div>
  );
}

export default withStyles(styles)(Topbar);
