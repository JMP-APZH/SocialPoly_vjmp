import React from "react";
import {
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  AccountCircle,
  PostAdd,
  CalendarToday,
  Assessment,
  Email,
} from "@mui/icons-material";

export default function SideBarContent() {
  return (
    <Toolbar style={{ padding: 0 }}>
      <List>
        <ListItem button key="Dashboard">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="Accounts">
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Accounts" />
        </ListItem>
        <ListItem button key="Posts">
          <ListItemIcon>
            <PostAdd />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItem>
        <ListItem button key="Calendar">
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button key="Reports">
          <ListItemIcon>
            <Assessment />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button key="Messages">
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      </List>
    </Toolbar>
  );
}
