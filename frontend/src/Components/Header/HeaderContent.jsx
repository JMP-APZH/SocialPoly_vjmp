import React, { useEffect } from "react";
import axios from "axios";
import {
  /* Badge, */ IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
} from "@mui/material";
import {
  /* Settings,
  Notifications,
  Person,
  Groups, */
  BrightnessHigh,
  Brightness4,
  Logout,
} from "@mui/icons-material";

export default function HeaderContent(props) {
  const [UserData, setUserData] = React.useState(false);

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
      }
    }
    getUserData();
  });

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
      {/* <IconButton>
        <Avatar alt={UserData.first_name} src={UserData.avatar} />
      </IconButton> */}
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick}>
          <Avatar src={UserData.avatar}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        /* PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }} */
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={UserLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
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
