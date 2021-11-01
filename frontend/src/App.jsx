import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppMain } from "./AppStyle";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestPage from "./Pages/TestPage/TestPage";
import Calendar from "./Pages/Calendar/Calendar";
import Accounts from "./Pages/Accounts/Accounts";
import GridDND from "./Components/GridDND/GridDND";
import MobileNavigation from "./Components/Navigation/MobileNavigation";
import DesktopNavigation from "./Components/Navigation/DesktopNavigation";
import { Box, CssBaseline } from "@mui/material";
import { setToLS, getFromLS } from "./utils/storage";
import { GlobalStyle } from "./globalStyle";
import Auth from "./Pages/Auth/Auth";

function App() {
  const UserSystemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [darkMode, setDarkMode] = useState(
    getFromLS("DarkMode") !== null ? getFromLS("DarkMode") : UserSystemTheme
  );
  const [drawerWidth, setDrawerWidth] = useState(180);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setToLS("DarkMode", !darkMode);
  };

  const toggleDrawer = () => {
    if (drawerWidth === 180) {
      setDrawerWidth(60);
    } else {
      setDrawerWidth(180);
    }
  };

  const DrawerWidthMargin = (drawerWidth + 20) / 8;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Router>
        <AppMain>
          <MobileNavigation
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
          <DesktopNavigation
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            toggleDrawer={toggleDrawer}
            drawerWidth={drawerWidth}
          />
          <Box
            sx={{
              ml: { xs: 1, sm: DrawerWidthMargin },
              mr: 1,
            }}
          >
            <Route path="/" component={TestPage} exact />
            <Route path="/auth" component={Auth} exact />
            <Route path="/dashboard" component={GridDND} exact />
            <Route path="/accounts" component={Accounts} exact />
            <Route path="/posts" component={TestPage} exact />
            <Route path="/calendar" component={Calendar} exact />
            <Route path="/reports" component={GridDND} exact />
            <Route path="/messages" component={GridDND} exact />
          </Box>
        </AppMain>
      </Router>
    </ThemeProvider>
  );
}

export default App;
