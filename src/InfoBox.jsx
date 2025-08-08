import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import "./SearchBox.css";

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

  // Format time in IST
  const normalizeUnixTime = (unixTime) => {
  // Convert from milliseconds to seconds if needed
  return unixTime > 1e12 ? Math.floor(unixTime / 1000) : unixTime;
};

const formatISTTime = (unixTime) => {
  if (!unixTime) return "N/A";
  const normalizedTime = normalizeUnixTime(unixTime);
  return new Date(normalizedTime * 1000).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const getISTHour = (unixTime) => {
  if (!unixTime) return 0;
  const normalizedTime = normalizeUnixTime(unixTime);
  return new Date(normalizedTime * 1000).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hour12: false,
  });
};


  const localTime = formatISTTime(info.dt);
  const sunriseTime = formatISTTime(info.sunrise);
  const sunsetTime = formatISTTime(info.sunset);

  const currentISTHour = parseInt(getISTHour(info.dt), 10);
  const sunriseISTHour = parseInt(getISTHour(info.sunrise), 10);
  const sunsetISTHour = parseInt(getISTHour(info.sunset), 10);

  const isNight =
    currentISTHour < sunriseISTHour || currentISTHour >= sunsetISTHour;

  const WALLPAPERS = {
    thunderstorm: {
      day: "https://images.pexels.com/photos/2684011/pexels-photo-2684011.jpeg",
      night: "https://images.pexels.com/photos/1677554/pexels-photo-1677554.jpeg",
    },
    showers: {
      day: "https://intheviewfinder.com/wp-content/uploads/2016/04/2016_03_28_sunset_014-copy.jpg",
      night: "https://th.bing.com/th/id/OIP.-D4iLzYDnGtTA7F5TBGFKgHaE8",
    },
    lightRain: {//
      day: "https://i.pinimg.com/736x/21/8b/2d/218b2dea0005efbfef1b78901714b30d.jpg",
      night: "https://wallpaperbat.com/img/550216-rainy-moon-background-romantic-rainy-day-wallpaper-rainy-night-wallpaper-and-rainy-day-digital-wallpaper.jpg",
    },
    overcast: {
      day: "https://wallpapercrafter.com/desktop/15044-clouds-porous-sky-sunset-overcast-4k.jpg",
      night: "https://toppng.com/uploads/preview/moon-clouds-night-sky-dark-overcast-11570240511swaylg4t4h.jpg",
    },
    brokenClouds: {
      day: "https://wallpapercave.com/wp/wp9410300.jpg",
      night: "https://wallpapercrafter.com/desktop/14233-moon-clouds-night-sky-dark-overcast-4k.jpg",
    },
    scatteredClouds: {
      day: "https://img.freepik.com/premium-photo/bright-sunny-day-with-scattered-clouds_868797-42875.jpg",
      night: "https://image.shutterstock.com/image-photo/bright-moon-over-scattered-clouds-260nw-387924823.jpg",
    },
    fewClouds: {
      day: "https://tse1.mm.bing.net/th/id/OIP.gBK2RFclbIOaBU2bgqtonAHaFj?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3",
      night: "https://tse3.mm.bing.net/th/id/OIP.fhPgo_RcRcaU7Siqt5nPNgHaE7?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    rain: {
      day: "https://tse3.mm.bing.net/th/id/OIP.q4fPDb1kwN1mGMV7hSrgHwHaHa",
      night: "https://tse3.mm.bing.net/th/id/OIP.q4fPDb1kwN1mGMV7hSrgHwHaHa",
    },
    hot: {
      day: "https://www.stockvault.net/blog/wp-content/uploads/2013/09/Summer-1.jpg",
      night: "https://th.bing.com/th/id/OIP.iY75ajOvDt9ri3Z5e3EnQgHaE8",
    },
    cold: {
      day: "https://tse3.mm.bing.net/th/id/OIP.8rMNs8i8h0hvW0Ut1ubTAAHaEK?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3",
      night: "https://wallpaperaccess.com/full/9262827.jpg",
    },
    clear: {
      day: "https://wallpaperaccess.com/full/3265126.jpg",
      night: "https://wallpaperaccess.com/full/7626463.jpg",
    },
  };

  const weatherDesc = info.weather.toLowerCase();
  let imageURL;

  if (weatherDesc.includes("thunderstorm")) {
    imageURL = isNight
      ? WALLPAPERS.thunderstorm.night
      : WALLPAPERS.thunderstorm.day;
  } else if (
    weatherDesc.includes("showers") ||
    weatherDesc.includes("heavy rain")
  ) {
    imageURL = isNight ? WALLPAPERS.showers.night : WALLPAPERS.showers.day;
  } else if (weatherDesc.includes("light rain")) {
    imageURL = isNight ? WALLPAPERS.lightRain.night : WALLPAPERS.lightRain.day;
  } else if (weatherDesc.includes("overcast")) {
    imageURL = isNight ? WALLPAPERS.overcast.night : WALLPAPERS.overcast.day;
  } else if (weatherDesc.includes("broken clouds")) {
    imageURL = isNight
      ? WALLPAPERS.brokenClouds.night
      : WALLPAPERS.brokenClouds.day;
  } else if (weatherDesc.includes("scattered clouds")) {
    imageURL = isNight
      ? WALLPAPERS.scatteredClouds.night
      : WALLPAPERS.scatteredClouds.day;
  } else if (weatherDesc.includes("few clouds")) {
    imageURL = isNight
      ? WALLPAPERS.fewClouds.night
      : WALLPAPERS.fewClouds.day;
  } else if (weatherDesc.includes("clear")) {
    imageURL = isNight ? WALLPAPERS.clear.night : WALLPAPERS.clear.day;
  } else if (weatherDesc.includes("rain")) {
    imageURL = isNight ? WALLPAPERS.rain.night : WALLPAPERS.rain.day;
  } else if (info.temp > 20) {
    imageURL = isNight ? WALLPAPERS.hot.night : WALLPAPERS.hot.day;
  } else {
    imageURL = isNight ? WALLPAPERS.cold.night : WALLPAPERS.cold.day;
  }

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
          "&:hover": {
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
            transition: "opacity 1s ease-in-out",
          }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom align="center">
            📍 {info.city}
          </Typography>
          
          <Typography
            variant="body1"
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
            <p>🕒 Local Time (India): <strong>{localTime}</strong></p>
            <p>🌅 Sunrise: <strong>{sunriseTime}</strong></p>
            <p>🌇 Sunset: <strong>{sunsetTime}</strong></p>
            <p>{isNight ? "🌙 It's Night" : "🌞 It's Day"}</p>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
