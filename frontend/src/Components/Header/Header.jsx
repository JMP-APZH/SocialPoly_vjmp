import React from "react";
import { HeaderMain } from "./HeaderStyle";
import logoHead from "../../assets/images/ParrotHead.png";
import { AppBar, /* Badge, */ IconButton } from "@mui/material";
import {
  Menu,
  /* Settings,
  Notifications,
  Person,
  Groups, */
  BrightnessHigh,
  Brightness4,
} from "@mui/icons-material";
import { useHistory } from "react-router";

export default function Header({ toggleDrawer, toggleDarkMode, darkMode }) {
  const history = useHistory();
  const HomeHandler = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <HeaderMain>
        <div className="TopLeft">
          <IconButton color="inherit" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <img
            src={logoHead}
            className="Logo"
            alt="Logo"
            onClick={HomeHandler}
          />
        </div>
        <div className="TopRight">
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? (
              <BrightnessHigh className="Icon" />
            ) : (
              <Brightness4 className="Icon" />
            )}
          </IconButton>
          {/*           <IconButton color="inherit">
            <Settings />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>
          <IconButton color="inherit">
            <Groups />
          </IconButton> */}
        </div>
      </HeaderMain>
    </AppBar>
  );
}
