"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565C0",
      light: "#1E88E5",
      dark: "#0D47A1",
    },
    secondary: {
      main: "#F5F7FA",
    },
    text: {
      primary: "#1A1A2E",
      secondary: "#6B7280",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    h1: {
      fontWeight: 800,
      fontSize: "3.2rem",
      lineHeight: 1.15,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.35rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#6B7280",
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: 1.6,
      color: "#6B7280",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 28px",
        },
        containedPrimary: {
          boxShadow: "0 4px 14px rgba(21, 101, 192, 0.35)",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(21, 101, 192, 0.45)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
