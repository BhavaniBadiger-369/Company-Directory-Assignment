// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#f9fafb",
            paper: "#ffffff",
          },
          text: {
            primary: "#1e293b",
            secondary: "#475569",
          },
        }
      : {
          background: {
            default: "#0f172a",
            paper: "#1e293b",
          },
          text: {
            primary: "#f8fafc",
            secondary: "#cbd5e1",
          },
        }),
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ef4444",
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: `"Inter", "Roboto", sans-serif`,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "background-color 0.3s ease, color 0.3s ease",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          transition: "color 0.3s ease, background-color 0.3s ease",
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
