import React from "react";
import { HeaderMain } from "./HeaderStyle";
import logoDuotone from "../../assets/images/ParrotHead.png";
import { AppBar, Badge, IconButton } from "@mui/material";
import {
  Menu,
  Settings,
  Notifications,
  Person,
  Groups,
  BrightnessHigh,
  Brightness4,
} from "@mui/icons-material";

export default function Header({
  handleDrawerToggle,
  toggleDarkMode,
  darkMode,
}) {
  return (
    <AppBar>
      <HeaderMain>
        <div className="TopLeft">
          <IconButton color="inherit" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
          <img src={logoDuotone} className="Logo" alt="Logo" />
        </div>
        <div className="TopRight">
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? (
              <BrightnessHigh className="Icon" />
            ) : (
              <Brightness4 className="Icon" />
            )}
          </IconButton>
          <IconButton color="inherit">
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
          </IconButton>
        </div>
      </HeaderMain>
    </AppBar>
  );
}
