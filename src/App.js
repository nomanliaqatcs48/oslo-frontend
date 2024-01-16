import React, {useState} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Login } from "./features/auth/Login";
import Dashboard from "./features/dashboard";
import { useDarkMode } from "../src/components/Theme";
import { getDesignTokens } from "./global-styles";
import { createTheme, useTheme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyles } from "./global";
import { lightTheme, darkTheme } from "./theme";
import Header from "./components/Header";

function App() {
  // const theme1 = useTheme();
  // console.log("tehemer", theme1)
  // const [theme, toggleTheme, componentMounted] = useDarkMode();
  // console.log("themes", toggleTheme)
  // const [themeMode, setThemeMode] =  useState(theme === "light" ? lightTheme : darkTheme);
  // const themeMode = theme === "light" ? lightTheme : darkTheme;

  // const themeMode = createTheme(getDesignTokens(theme));
  const { theme } = useSelector(
    (state) => state.theme
  );
  console.log("theme", theme)
  // React.useEffect(() => {
  //  console.log("theme", theme);
  //  debugger
  //  setThemeMode(theme === "light" ? lightTheme : darkTheme)
  // }, [theme]);

  // if (!componentMounted) {
  //   return <div />;
  // }

  

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      {/* <div style={{background: themeMode.palette.background.primary, height: "100vh"}}> */}
      {/* <div className="container-fluid p-4">
        <Header page="login" onToggle ={() => toggleTheme()}/>
        </div> */}
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      {/* </div> */}
    </ThemeProvider>
  );
}

export default App;
