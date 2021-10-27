import React, { useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import "./AppStyle";
import { AppMain } from "./AppStyle";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestPage from "./Pages/TestPage/TestPage";
import GridDND from "./Components/GridDND/GridDND";
import Header from "./Components/Header/Header";
import CssBaseline from "@mui/material/CssBaseline";
import { setToLS, getFromLS } from "./utils/storage";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  const UserSystemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [darkMode, setDarkMode] = useState(
    getFromLS("DarkMode") !== null ? getFromLS("DarkMode") : UserSystemTheme
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setToLS("DarkMode", !darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppMain>
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <Offset />
          <Route path="/" component={TestPage} exact />
          <Route path="/grid" component={GridDND} exact />
        </AppMain>
      </Router>
    </ThemeProvider>
  );
}

export default App;
