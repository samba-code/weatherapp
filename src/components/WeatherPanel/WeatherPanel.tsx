import Typography from "@mui/material/Typography";

interface IWeatherPanel {
  description: string;
  temperature: number;
  sunrise: string;
  sunset: string;
}

const WeatherPanel: React.FC<IWeatherPanel> = ({
  description,
  temperature,
  sunrise,
  sunset,
}) => (
  <>
    <Typography variant="h5" component="p" mt={2}>
      Description:
      <br /> {description}
    </Typography>
    <Typography variant="h5" component="p" mt={2}>
      Temperature:
      <br /> {temperature}°
    </Typography>
    <Typography variant="h5" component="p" mt={2}>
      Sunrise:
      <br /> {sunrise}
    </Typography>
    <Typography variant="h5" component="p" mt={2}>
      Sunset:
      <br /> {sunset}
    </Typography>
  </>
);
export default WeatherPanel;
