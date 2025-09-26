import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { GatewayAuthService } from './gateway-auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class GatewayAuthController {
  constructor(private readonly authService: GatewayAuthService) { }

  @Post('/register')
  @Throttle({ short: {} })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  @Throttle({ short: {} })
  findOne(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Post('/refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const result = await this.authService.refreshToken(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');
    return result;
  }


}
