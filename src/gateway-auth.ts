import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Missing token');

    const token = authHeader.split(' ')[1];
    try {
      const result = await lastValueFrom(this.client.send({ cmd: 'validate_token' }, {token, type: 'access'}));
      if (!result) throw new UnauthorizedException('Invalid token');
      req.user = result;
      return true;
    } catch (error) {
      console.log('error new', error);
      if (error.message === 'jwt expired') {
        throw new UnauthorizedException({ message: 'Token expired', refresh: true });
      }
      throw new UnauthorizedException('Invalid token');
    }

  }

}
