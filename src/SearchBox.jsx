import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const theme = useTheme();

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "0680a5d4469ae6ad2ec91d89e4a99222";

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found or API error");
      }

      const json = await response.json();

      return {
        city: city,
        temp: json.main.temp,
        tempMin: json.main.temp_min,
        tempMax: json.main.temp_max,
        humidity: json.main.humidity,
        feelslike: json.main.feels_like,
        weather: json.weather[0].description,
      };
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    const newInfo = await getWeatherInfo();

    if (newInfo) {
      updateInfo(newInfo);
      setCity("");
    }
  };

  return (
    <Box
      className="SearchBox"
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: 3,
        borderRadius: 3,
        boxShadow: 3,
        maxWidth: 500,
        margin: "auto",
        mt: 4,
      }}
    >
      <form onSubmit={handleSubmit} className="formRow">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            id="city"
            label="City Name"
            variant="outlined"
            required
            value={city}
            onChange={handleChange}
            size="small"
            fullWidth
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? "#2c2c2c" : "#f0f0f0",
              borderRadius: 1,
            }}
          />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SearchIcon />}
            sx={{
              paddingX: 3,
              paddingY: 1,
              fontWeight: "bold",
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Search
          </Button>
        </Box>
      </form>

      {error && (
        <Typography
          variant="body1"
          sx={{
            mt: 3,
            color: theme.palette.error.main,
            fontWeight: 800,
          }}
        >
          ⚠️ {error}
        </Typography>
      )}
    </Box>
  );
}
