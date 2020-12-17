import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#52BEEB",
    },
    secondary: {
      main: "#F04664",
      contrastText: "#FFF",
    },
    tertiary: {
      main: "#F0E05C",
      dark: "#F0CD5C",
    },
    dark: {
      main: "#277FA3",
      contrastText: "#FFF",
    },
  },
  typography: {
    fontFamily: "Dosis, sans-serif",
    h1: {
      fontFamily: "Carter One, sans-serif",
      fontSize: "520%",
    },
    h2: {
      fontFamily: "Bebas Neue, sans-serif",
    },
    h3: {
      fontFamily: "Bebas Neue, sans-serif",
    },
    h4: {
      fontFamily: "Bebas Neue, sans-serif",
    },
    h5: {
      fontFamily: "Bebas Neue, sans-serif",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        minHeight: "64px",
      },
    },
    MuiToolbar: {
      root: {
        height: "64px",
      },
    },
  },
});

export default theme;
