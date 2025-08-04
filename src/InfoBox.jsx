import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import "./SearchBox.css"; // Make sure this doesn't override .InfoBox badly

export default function InfoBox({ info }) {
  const theme = useTheme();

  if (!info) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No weather information available.
        </Typography>
      </Box>
    );
  }

  const COLD_URL =
    "https://static01.nyt.com/images/2019/01/20/us/20storm-2print/merlin_149444082_89d4b8a5-d4c9-4f29-aaaa-85b509a13c6a-superJumbo.jpg?quality=90&auto=webp";
  const HOT_URL =
    "https://th.bing.com/th/id/R.d5295cb4d5ff37ae230254a8114604c3?rik=jlSFVZH0k6kA5g&riu=http%3a%2f%2fwww.stockvault.net%2fblog%2fwp-content%2fuploads%2f2013%2f09%2fSummer-1.jpg&ehk=KQFEWMQbalU512crN3eFjpoJY8Ygu6Df26qfMOx6N3Q%3d&risl=&pid=ImgRaw&r=0";
  const RAIN_URL =
    "https://static.vecteezy.com/system/resources/previews/033/645/252/non_2x/drizzle-rainy-day-in-autumn-background-and-wallpaper-generative-ai-photo.jpg";

  const imageURL =
    info.humidity > 80 ? RAIN_URL : info.temp > 15 ? HOT_URL : COLD_URL;

  return (
    <Box className="InfoBox">
      <Card
        sx={{
          width: "90%",
          maxWidth: "600px",
          margin: "2rem auto",
          borderRadius: 3,
          boxShadow: 6,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          '&:hover': {
            transform: "scale(1.02)",
            boxShadow: 10,
          },
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={imageURL}
          alt="Weather condition"
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            fontWeight={600}
            gutterBottom
            align="center"
          >
            📍 {info.city}
          </Typography>

          <Typography
            variant="body1"
            component="div"
            sx={{
              fontSize: "1.05rem",
              lineHeight: 1.7,
              px: 1,
              color: theme.palette.mode === "dark" ? "#ccc" : "#333",
            }}
          >
            <p>🌡️ Temperature: <strong>{info.temp}°C</strong></p>
            <p>💧 Humidity: <strong>{info.humidity}%</strong></p>
            <p>⬇️ Min Temp: <strong>{info.tempMin}°C</strong></p>
            <p>⬆️ Max Temp: <strong>{info.tempMax}°C</strong></p>
            <p>🌥️ Description: <i>{info.weather}</i></p>
            <p>🤔 Feels like: <strong>{info.feelslike}°C</strong></p>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
