import React from "react";
import { /* Badge, */ IconButton } from "@mui/material";
import {
  /* Settings,
  Notifications,
  Person,
  Groups, */
  BrightnessHigh,
  Brightness4,
} from "@mui/icons-material";

export default function HeaderContent(props) {
  return (
    <div>
      <IconButton color="inherit" onClick={props.toggleDarkMode}>
        {props.darkMode ? (
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
  );
}
