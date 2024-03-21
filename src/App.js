import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { Login } from "./features/auth/Login";
import Dashboard from "./features/dashboard";
import { useSelector } from "react-redux";
import { GlobalStyles } from "./global";
import { lightTheme, darkTheme } from "./theme";
import "./App.css";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ToastContainer />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
