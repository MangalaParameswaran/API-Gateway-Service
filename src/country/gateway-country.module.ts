import { Module } from '@nestjs/common';
import { GatewayCountryService } from './gateway-country.service';
import { GatewayCountryController } from './gateway-country.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayAuthModule } from 'src/auth/gateway-auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COUNTRY_SERVICE',
        transport: Transport.TCP,
        options: { port: 3005 }
      }
    ]),
    GatewayAuthModule
  ],
  controllers: [GatewayCountryController],
  providers: [GatewayCountryService],
  exports: [ClientsModule]
})
export class GatewayCountryModule { }
