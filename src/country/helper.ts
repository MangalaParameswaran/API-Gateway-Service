import { HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

export async function getCountryWithWeather(country: any, weatherApi: string) {

    let weatherDetails = await axios.get(`${weatherApi}`, {
        params: {
            latitude: country.latitude,
            longitude: country.longitude,
            current_weather: true,
            timezone: 'auto'
        }
    });

    if (!weatherDetails) return new HttpException('Weather details is not available', HttpStatus.INTERNAL_SERVER_ERROR)

    const currentweather = weatherDetails.data.current_weather
    const { temperature, windspeed, is_day, time } = currentweather
    const countryWithWeather = {
        ...country,
        temperature,
        windspeed,
        is_day,
        time: getLocalTime(time)
    }
    return countryWithWeather
}

function getLocalTime(time: string): string {
    return new Date(time).toLocaleTimeString()
}