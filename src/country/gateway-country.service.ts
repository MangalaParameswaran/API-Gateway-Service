import { Injectable, Inject, BadRequestException, NotFoundException, GatewayTimeoutException, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { getCountryWithWeather } from './helper';

@Injectable()
export class GatewayCountryService {
  private weatherApi: string;

  constructor(
    @Inject('COUNTRY_SERVICE')
    private countryServiceClient: ClientProxy,
    private configService: ConfigService
  ) {
    this.weatherApi = this.configService.get<string>('WEATHER_API') || '';
  }

  async searchCountry(countryName: string) {
    try {
      const result = await axios.get(
        `${this.configService.get<string>('COUNTRY_API')}${countryName}`
      );

      if (Array.isArray(result.data) && result.data.length > 0) {
        const countryWithWeather = await getCountryWithWeather(
          result.data[0],
          this.weatherApi
        );
        return countryWithWeather;
      } else {
        throw new NotFoundException('Country not found');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new NotFoundException('Country not found in external API');
      }
      throw new BadRequestException('Invalid country name or API error');
    }
  }

  async addCountry(createCountryDto: any) {
    try {
      const result = await lastValueFrom(
        this.countryServiceClient.send({ cmd: 'create_country' }, createCountryDto)
      );

      if (!result?.data) {
        throw new InternalServerErrorException('Failed to create country');
      }

      const countryWithWeather = await getCountryWithWeather(
        result.data,
        this.weatherApi
      );

      return {
        success: true,
        data: countryWithWeather,
      };
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to add country: ${error.message}`
      );
    }
  }

  async getUserCountries(id: string) {
    try {
      const result = await lastValueFrom(
        this.countryServiceClient.send({ cmd: 'find_country_by_id' }, id)
      );

      if (!result?.data || result.data.length === 0) {
        throw new NotFoundException(`No countries found for user ID ${id}`);
      }

      const countriesWithWeather = await Promise.all(
        result.data.map(async (country: any) =>
          getCountryWithWeather(country, this.weatherApi)
        )
      );

      return {
        success: true,
        data: countriesWithWeather,
      };
    } catch (error: any) {
      throw new GatewayTimeoutException(
        `Failed to fetch user countries: ${error.message}`
      );
    }
  }

  async deleteUserCountries(obj: any) {
    try {
      const result = await lastValueFrom(
        this.countryServiceClient.send({ cmd: 'remove_country' }, obj)
      );

      if (!result) {
        throw new NotFoundException('Country not found');
      }

      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      throw new GatewayTimeoutException(
        `Connection to country service interrupted: ${error.message}`
      );
    }
  }
}
