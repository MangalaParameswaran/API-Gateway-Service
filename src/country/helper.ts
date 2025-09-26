import { HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

export async function getCountryWithWeather(country: any, weatherApi: string) {
  try {
    const weatherDetails = await axios.get(`${weatherApi}`, {
      params: {
        latitude: country.latlng ? country.latlng[0] : country['latitude'],
        longitude: country.latlng ? country.latlng[1] : country['longitude'],
        current_weather: true,
        timezone: 'auto'
      }
    });

    if (!weatherDetails?.data?.current_weather) {
      throw new HttpException(
        'Weather details are not available',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const { temperature, windspeed, is_day, time } = weatherDetails.data.current_weather;

    const countryWithWeather = {
      ...country,
      temperature,
      windspeed,
      is_day,
      time: getLocalTime(time),
    };

    return countryWithWeather;

  } catch (error: any) {
    console.error("Weather API error:", error.message);

    // If axios error, include more context
    if (error.response) {
      throw new HttpException(
        `Weather API failed with status ${error.response.status}: ${error.response.statusText}`,
        HttpStatus.BAD_GATEWAY
      );
    }

    throw new HttpException(
      'Failed to fetch weather details',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

function getLocalTime(time: string): string {
  return new Date(time).toLocaleTimeString();
}
