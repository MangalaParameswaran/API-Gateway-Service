import { Injectable, Inject, GatewayTimeoutException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayAuthService {

  constructor(
    @Inject('AUTH_SERVICE')
    private authClient: ClientProxy,
  ) { }

  async register(createAuthDto: CreateAuthDto) {
    try {
      return await lastValueFrom(this.authClient.send({ cmd: 'create_user' }, createAuthDto))
    } catch (error) {
      throw new GatewayTimeoutException('Register User service connection failed');
    }
  }

  async login(loginData: LoginDto) {
    try {
      const result = await lastValueFrom(this.authClient.send({ cmd: 'login_user' }, loginData));
      return result;
    } catch (error) {
      throw new GatewayTimeoutException('User service connection failed');
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const result = await lastValueFrom(this.authClient.send({ cmd: 'refresh_token' }, refreshToken));
      return result;
    } catch (error) {
      throw new RpcException({
        statusCode: 401,
        message: 'Invalid or expired refresh token',
      });
    }
  }

}
