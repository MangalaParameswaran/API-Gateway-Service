import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GatewayAuthService } from './gateway-auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class GatewayAuthController {
  constructor(private readonly authService: GatewayAuthService) {}

  @Post('/register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  findOne(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

}
