// import PoppinsRegular from './fonts/Poppins-Regular.ttf';
// import PoppinsBold from './fonts/Poppins-Bold.ttf';
import { createTheme } from "@material-ui/core/styles";

const theme = {
  primary: "#217346",
  primary2: "#707070",
  white: "#FFFFFF",
  primaryBG: "#2C2C2C",
  black: "#000000",
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { main: theme.primary },
          text: {
            primary: theme.black,
            secondary: theme.secondary,
          },
          background: {
            primary: theme.primaryBG,
            secondary: theme.secondaryBG,
          },
        }
      : {
          // palette values for dark mode
          primary: { main: theme.primary },
          background: {
            primary: theme.primaryBG,
            secondary: theme.black,
          },
          text: {
            primary: theme.white,
            secondary: theme.secondaryBG,
          },
        }),
  },
});

// const muiTheme = createMuiTheme({
//   palette: {
//     primary: { main: theme.primary },
//   },
//   overrides: {},
// });

// export default GlobalStyle;
export { theme, getDesignTokens };
