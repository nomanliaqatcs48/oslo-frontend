import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  theme: "light"
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    clearState: () => initialState,
    setTheme: (state, action) => {
        state.theme = action.payload;
      },
  },
});

export const { clearState, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
