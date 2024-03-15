import React from "react";
import LightThemeSVG from "../../assets/lightTheme.svg";
import DarkThemeSVG from "../../assets/darkTheme.svg";
import { setTheme } from "./theme.slice";

export const ThemeIcon = ({ dispatch, theme, page, className }) => (
  <img
    src={theme === "light" ? LightThemeSVG : DarkThemeSVG}
    alt="theme"
    width={32}
    height={32}
    className={`cursor-pointer mr-1 ${
      page === "dashboard" && "mt-1"
    } ${className}`}
    onClick={() => dispatch(setTheme(theme === "light" ? "dark" : "light"))}
  />
);
