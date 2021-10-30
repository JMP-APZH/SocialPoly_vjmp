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
import { useHistory } from "react-router";

export default function SideBarContent() {
  const history = useHistory();
  const DashboardHandler = (e) => {
    e.preventDefault();
    history.push("/dashboard/");
  };
  const AccountsHandler = (e) => {
    e.preventDefault();
    history.push("/accounts/");
  };
  const PostsHandler = (e) => {
    e.preventDefault();
    history.push("/posts/");
  };
  const CalendarHandler = (e) => {
    e.preventDefault();
    history.push("/calendar/");
  };
  const ReportsHandler = (e) => {
    e.preventDefault();
    history.push("/reports/");
  };
  const MessagesHandler = (e) => {
    e.preventDefault();
    history.push("/messages/");
  };

  return (
    <Toolbar style={{ padding: 0 }}>
      <List>
        <ListItem button key="Dashboard" onClick={DashboardHandler}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="Accounts" onClick={AccountsHandler}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Accounts" />
        </ListItem>
        <ListItem button key="Posts" onClick={PostsHandler}>
          <ListItemIcon>
            <PostAdd />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItem>
        <ListItem button key="Calendar" onClick={CalendarHandler}>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button key="Reports" onClick={ReportsHandler}>
          <ListItemIcon>
            <Assessment />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button key="Messages" onClick={MessagesHandler}>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      </List>
    </Toolbar>
  );
}
