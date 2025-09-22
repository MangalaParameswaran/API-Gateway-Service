import { HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

export async function getCountryWithWeather(country: any, weatherApi: string) {
    console.log('country in helper---', country.latlng?.[0], country.latlng?.[1]);

    let weatherDetails = await axios.get(`${weatherApi}`, {
        params: {
            latitude: country.latlng?.[0],
            longitude: country.latlng?.[1],
            current_weather: true,
            timezone: 'auto'
        }
    });
    
    
    if (!weatherDetails) return new HttpException('Weather details is not available', HttpStatus.INTERNAL_SERVER_ERROR)
        
        console.log('weatherDetails---', weatherDetails);
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