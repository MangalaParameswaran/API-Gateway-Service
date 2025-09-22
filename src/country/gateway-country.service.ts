import { HttpException, HttpStatus, Inject, Injectable, GatewayTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs'
import { getCountryWithWeather } from './helper';

@Injectable()
export class GatewayCountryService {

  weatherApi: any;

  constructor( 
    @Inject('COUNTRY_SERVICE')
    private countryServiceClient: ClientProxy,
    private configService: ConfigService
   ) {
    this.weatherApi = this.configService.get<string>('WEATHER_API')||''
   }
   
  
  async searchCountry(countryName: string) {
    try {
      const result = await axios.get(`${this.configService.get<string>('COUNTRY_API')}${countryName}}`)
      console.log('result-------get-', result.data)

      return result.data;

    } catch (error) {
      throw new HttpException('Country does not exist on search',HttpStatus.BAD_REQUEST)
    }
  }
  
  async addcountry(createCountryDto: any) {
    try {
      const result = await lastValueFrom(this.countryServiceClient.send({cmd: 'create_country'}, createCountryDto));
      console.log('result-----add---', result)

      return getCountryWithWeather(result.data, this.weatherApi)
      
    } catch (error) {
      throw new HttpException('Country does not exist on add',HttpStatus.BAD_REQUEST)
    }
  }

  async getUserCountries(id: number) {
    try {
      const result = await lastValueFrom(this.countryServiceClient.send({cmd: 'find_country_by_id'}, id));
      console.log('result--getid------', result)
      let  countriesWithWeather:any = await Promise.all(
        result.map(async (country: any)=> await getCountryWithWeather(country,this.weatherApi) )
      )
      return countriesWithWeather
    } catch (error) {
      throw new GatewayTimeoutException(`Connection to country service is interrupted ${error.message}`)
    }
  }

  async deleteUserCountries(obj: any) {
    try {
      const result = await lastValueFrom(this.countryServiceClient.send({cmd: 'remove_country'}, obj));
      return result;
      
    } catch (error) {
      throw new GatewayTimeoutException(`Connection to country service is interrupted ${error.message}`)
    }
  }
}
