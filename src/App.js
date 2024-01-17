import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Login } from "./features/auth/Login";
import Dashboard from "./features/dashboard";
import { useSelector } from "react-redux";
import { GlobalStyles } from "./global";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
