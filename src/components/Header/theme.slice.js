import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: window.localStorage.getItem("theme") || "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    clearState: () => initialState,
    setTheme: (state, action) => {
      window.localStorage.setItem("theme", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { clearState, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
