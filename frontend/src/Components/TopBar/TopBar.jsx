import React from "react";
import { TopBarMain } from "./TopBarStyle";
import logo from "../../Parrot.png";
import {
  Menu,
  Settings,
  Notifications,
  Person,
  Groups,
} from "@mui/icons-material";

export default function TopBar() {
  return (
    <TopBarMain>
      <div className="TopLeft">
        <Menu className="Icon" />
        <img src={logo} className="Logo" alt="Logo" />
      </div>
      <div className="TopRight">
        <Settings className="Icon" />
        <div className="NotificationContainer">
          <Notifications className="Icon" />
          <span className="NotificationCounter">2</span>
        </div>
        <Person className="Icon" />
        <Groups className="Icon" />
      </div>
    </TopBarMain>
  );
}
