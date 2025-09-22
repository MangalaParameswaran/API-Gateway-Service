import { Injectable, Inject, GatewayTimeoutException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayAuthService {

  constructor(
    @Inject('AUTH_SERVICE')
        private authClient: ClientProxy,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    try {
      return await lastValueFrom(this.authClient.send({cmd: 'create_user'}, createAuthDto))
    } catch (error) {
      throw new GatewayTimeoutException('Register User service connection failed');
    }
  }

  async login(loginData: LoginDto) {
    try {
      return await lastValueFrom(this.authClient.send({cmd: 'login_user'}, loginData))
    } catch (error) {
      throw new GatewayTimeoutException('User service connection failed');
    }
  }

}
