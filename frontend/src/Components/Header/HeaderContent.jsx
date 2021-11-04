import React, { useEffect } from "react";
import axios from "axios";
import {
  /* Badge, */
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
} from "@mui/material";
import {
  Settings,
  Notifications,
  BrightnessHigh,
  Brightness4,
  Logout,
} from "@mui/icons-material";

export default function HeaderContent(props) {
  const [UserData, setUserData] = React.useState(false);
  const [UserAvatar, setUserAvatar] = React.useState(false);

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/users/me/`,
        config
      );
      if (response.data) {
        setUserData(response.data);
        setUserAvatar(
          response.data.avatar.replace(
            "http://backend:8000",
            "https://socialpoly.ch"
          )
        );
      }
    }
    getUserData();
  }, []);

  const UserLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  // Account Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={props.toggleDarkMode}>
        {props.darkMode ? (
          <BrightnessHigh className="Icon" />
        ) : (
          <Brightness4 className="Icon" />
        )}
      </IconButton>
      <IconButton color="inherit">
        {/* <Badge badgeContent={4} color="secondary">
          <Notifications />
        </Badge> */}
        <Notifications />
      </IconButton>
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick}>
          <Avatar src={UserAvatar}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <p style={{ display: "flex", justifyContent: "center" }}>
          Hello {UserData.first_name}!
        </p>
        <MenuItem
          onClick={() => {
            window.location.assign("/settings");
          }}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={UserLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
