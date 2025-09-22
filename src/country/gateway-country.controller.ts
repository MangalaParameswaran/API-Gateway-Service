import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { GatewayCountryService } from './gateway-country.service';
import { GatewayAuthGuard } from 'src/gateway-auth';

@Controller('country')
@UseGuards(GatewayAuthGuard)
export class GatewayCountryController {
  constructor(private readonly countryService: GatewayCountryService) {}

  @Get('/:countryName')
  findAll(@Param('countryName') countryName: string) {
    return this.countryService.searchCountry(countryName);
  }

  @Post('save/user/countries')
  create(@Body() createCountryDto: any) {
    console.log('------', createCountryDto);
    
    return this.countryService.addcountry(createCountryDto);
  }

  @Get('user/countries/:id')
  findOne(@Param('id') id: string) {
    return this.countryService.getUserCountries(+id);
  }

  @Delete('user/countries')
  remove(@Body() data: any) {
    return this.countryService.deleteUserCountries(data);
  }
}
