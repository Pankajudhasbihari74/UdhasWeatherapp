import React, { useState, useMemo, useEffect } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  IconButton,
  Typography,
  Box,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function WeatherApp() {
  // Initial weather state
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Wonderland",
    feelslike: 24.84,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    weather: "haze",
  });

  // Detect system dark mode preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Load theme mode from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("weather-app-dark-mode");
    return saved ? JSON.parse(saved) : prefersDarkMode;
  });

  // Persist dark mode setting
  useEffect(() => {
    localStorage.setItem("weather-app-dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Update weather info callback
  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  // Theme creation
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#90caf9" : "#1976d2",
          },
          background: {
            default: darkMode ? "#121212" : "#f5f5f5",
            paper: darkMode ? "#1e1e1e" : "#ffffff",
          },
        },
        typography: {
          fontFamily: `"Roboto", "Segoe UI", sans-serif`,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: "background-color 0.3s ease, color 0.3s ease",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          paddingBottom: "2rem",
          transition: "all 0.3s ease-in-out",

          // Center horizontally, full width
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: 800,
            width: "100%",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            🌦️ Udhas Weather App
          </Typography>

          <Tooltip title="Toggle dark mode">
            <IconButton onClick={() => setDarkMode((prev) => !prev)} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Main Content Section */}
        <Box
          sx={{
            maxWidth: 800,
            width: "100%",
            textAlign: "center",
          }}
        >
          <SearchBox updateInfo={updateInfo} />
          <InfoBox info={weatherInfo} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
