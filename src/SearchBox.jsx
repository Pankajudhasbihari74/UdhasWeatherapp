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

      const currentTime = json.dt;
      const sunriseTime = json.sys.sunrise;
      const sunsetTime = json.sys.sunset;

      const isDayTime = currentTime >= sunriseTime && currentTime <= sunsetTime;

      return {
        city: city,
        temp: json.main.temp,
        tempMin: json.main.temp_min,
        tempMax: json.main.temp_max,
        humidity: json.main.humidity,
        feelslike: json.main.feels_like,
        weather: json.weather[0].description,
        dt: json.dt,                   // Current time (Unix)
        timezone: json.timezone,       // Timezone offset in seconds
        sunrise: json.sys.sunrise,     // Sunrise time (Unix)
        sunset: json.sys.sunset,       // Sunset time (Unix)
        dayOrNight: isDayTime ? "Day" : "Night"  // Day or Night Detection
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
      className="search-box-glass"
      sx={{
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        padding: { xs: 2, sm: 3 },
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        maxWidth: 500,
        margin: "auto",
        mt: 8,
      }}
    >
      <form onSubmit={handleSubmit}>
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
            label="Enter City"
            variant="filled"
            required
            value={city}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "12px",
              },
            }}
            InputLabelProps={{
              style: { fontWeight: "600", color: "#555" },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SearchIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: "12px",
              background: "linear-gradient(45deg, #3f51b5, #2196f3)",
              boxShadow: "0px 4px 20px rgba(33, 150, 243, 0.5)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(45deg, #2196f3, #3f51b5)",
                transform: "scale(1.05)",
                boxShadow: "0px 6px 25px rgba(33, 150, 243, 0.7)",
              },
            }}
          >
            Search
          </Button>
        </Box>
      </form>

      {error && (
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            color: theme.palette.error.main,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          ⚠️ {error}
        </Typography>
      )}
    </Box>
  );
}
