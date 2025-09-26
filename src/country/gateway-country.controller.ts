import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { GatewayCountryService } from './gateway-country.service';
import { GatewayAuthGuard } from 'src/gateway-auth';
import { Throttle } from '@nestjs/throttler';

@Controller('country')
@UseGuards(GatewayAuthGuard)
export class GatewayCountryController {
  constructor(private readonly countryService: GatewayCountryService) {}

  @Get('/:countryName')
  @Throttle({short : {}})
  findAll(@Param('countryName') countryName: string) {
    return this.countryService.searchCountry(countryName);
  }

  @Post('save/user/countries')
  @Throttle({medium : {}})
  create(@Body() createCountryDto: any) {
    return this.countryService.addCountry(createCountryDto);
  }

  @Get('user/countries/:id')
  @Throttle({medium : {}})
  findOne(@Param('id') id: string) {
    return this.countryService.getUserCountries(id);
  }

  @Delete('user/countries')
  @Throttle({medium : {}})
  remove(@Body() data: any) {
    return this.countryService.deleteUserCountries(data);
  }
}
