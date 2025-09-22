import { Module } from '@nestjs/common';
import { GatewayAuthService } from './gateway-auth.service';
import { GatewayAuthController } from './gateway-auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 }
      }
    ])
  ],
  controllers: [GatewayAuthController],
  providers: [GatewayAuthService],
  exports: [ClientsModule]
})
export class GatewayAuthModule { }
