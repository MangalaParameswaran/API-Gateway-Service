import { HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

export async function getCountryWithWeather(country: any, weatherApi: string) {
    let weatherDetails = await axios.get(`${weatherApi}`, {
        params: {
            latitude: country.latlng ? country.latlng[0] : country['latitude'],
            longitude: country.latlng ? country.latlng[1] : country['longitude'],
            current_weather: true,
            timezone: 'auto'
        }
    });
    
    
    console.log('weatherDetails---', weatherDetails.data.current_weather);
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
    console.log('getLocalTime---', time);
    
    return new Date(time).toLocaleTimeString()
}