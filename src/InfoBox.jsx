import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./SearchBox.css";  

export default function InfoBox({ info }) { 
    console.log(info);
    const INIT_URL =
    "https://cdn.zeebiz.com/sites/default/files/2023/05/23/243689-jharkhand-weather-toda.jpg";

    let COLD_URL = "https://static01.nyt.com/images/2019/01/20/us/20storm-2print/merlin_149444082_89d4b8a5-d4c9-4f29-aaaa-85b509a13c6a-superJumbo.jpg?quality=90&auto=webp";
    let HOT_URL = "https://th.bing.com/th/id/R.d5295cb4d5ff37ae230254a8114604c3?rik=jlSFVZH0k6kA5g&riu=http%3a%2f%2fwww.stockvault.net%2fblog%2fwp-content%2fuploads%2f2013%2f09%2fSummer-1.jpg&ehk=KQFEWMQbalU512crN3eFjpoJY8Ygu6Df26qfMOx6N3Q%3d&risl=&pid=ImgRaw&r=0";

    let RAIN_URL = "https://static.vecteezy.com/system/resources/previews/021/607/747/large_2x/a-people-with-an-umbrella-in-the-middle-of-heavy-rain-at-the-road-background-photo.jpg"

  return (
    <div className="InfoBox">
        <div className="cardContainer">
            <Card sx={{ maxWidth: 445 }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={
                      info.humidity > 80
                      ? RAIN_URL
                    : info.temp> 15
                    ? HOT_URL
                    : COLD_URL
                  }
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {info.city} 
                        
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component={"span"}>
                        <p>Temperature = {info.temp}&deg;C</p>
                        <p>Humidity = {info.humidity}%</p>
                        <p>Min Temp = {info.tempMin}&deg;C</p>
                        <p>Max Temp = {info.tempMax}&deg;C</p>
                        <p>The weather can be described as <i>{info.weather}</i> and feels like {info.feelslike}&deg;C</p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
