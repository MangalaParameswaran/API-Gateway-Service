import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Missing token');

    const token = authHeader.split(' ')[1];
    const result = await lastValueFrom(this.client.send({ cmd: 'validate_token' }, token));

    if (!result) throw new UnauthorizedException('Invalid token');
    req.user = result;
    return true;
  }

}
