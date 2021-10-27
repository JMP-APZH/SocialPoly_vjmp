import React from "react";
import SideBarContent from "./SideBarContent";
import { Drawer, Toolbar } from "@mui/material";
import { StyledBox } from "./SideBarStyle";

export default function SideBar(props) {
  return (
    <StyledBox sx={{ display: "flex", overflow: "auto" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: props.drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: props.drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <SideBarContent />
      </Drawer>
    </StyledBox>
  );
}
