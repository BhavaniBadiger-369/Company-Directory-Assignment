// src/App.js
import React, { useMemo, useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CompaniesPage from "./pages/CompaniesPage";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  CssBaseline,
  Tooltip,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "./theme";
import BusinessIcon from "@mui/icons-material/Business";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "light");

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        {/* AppBar */}
        <AppBar position="static" color="primary" elevation={2}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <BusinessIcon />
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Company Directory
                </Typography>
              </Link>
            </Box>

            {/*  Theme Toggle */}
            <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/*  Page Content */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<CompaniesPage />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
