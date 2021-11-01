import React from "react";
import { styled } from "@mui/material/styles";
import { HeaderMain } from "../Header/HeaderStyle";
import logoHead from "../../assets/images/ParrotHead.png";
import { AppBar, IconButton, Drawer, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import HeaderContent from "../Header/HeaderContent";
import { useHistory } from "react-router";
import SideBarContent from "../SideBar/SideBarContent";
import { StyledBox } from "../SideBar/SideBarStyle";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function DesktopNavigation({
  toggleDrawer,
  toggleDarkMode,
  darkMode,
  drawerWidth,
}) {
  const history = useHistory();
  const HomeHandler = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: { xs: "none", sm: "flex" },
        }}
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
          <HeaderContent
            className="TopRight"
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        </HeaderMain>
      </AppBar>
      <Offset />
      <StyledBox sx={{ overflow: "auto", display: { xs: "none", sm: "flex" } }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              overflow: "hidden",
            },
          }}
        >
          <Toolbar />
          <SideBarContent />
        </Drawer>
      </StyledBox>
    </div>
  );
}
