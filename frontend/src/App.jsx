import React, { useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import "./AppStyle";
import { AppMain } from "./AppStyle";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestPage from "./Pages/TestPage/TestPage";
import GridDND from "./Components/GridDND/GridDND";
import Header from "./Components/Header/Header";
import SideBar from "./Components/SideBar/SideBar";
import { Box, CssBaseline } from "@mui/material";
import { setToLS, getFromLS } from "./utils/storage";
import {GlobalStyle} from './globalStyle'
import Auth from './Pages/Auth/Auth';

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  /* let drawerWidth = 180; */
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Router>
        <AppMain>
          <Header
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            toggleDrawer={toggleDrawer}
          />
          <Offset />
          <SideBar drawerWidth={drawerWidth} />
          <Box style={{ marginLeft: drawerWidth + 20 }}>
            <Route path="/" component={TestPage} exact />
            <Route path="/grid" component={GridDND} exact />
            <Route path='/auth' component={Auth} exact />
          </Box>
        </AppMain>
      </Router>
    </ThemeProvider>
  );
}

export default App;
