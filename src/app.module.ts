import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayCountryModule } from './country/gateway-country.module';
import { GatewayAuthModule } from './auth/gateway-auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GatewayCountryModule,
    GatewayAuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
