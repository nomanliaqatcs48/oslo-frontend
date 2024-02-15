import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import themeReducer from "../components/Header/theme.slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer
  },
});
