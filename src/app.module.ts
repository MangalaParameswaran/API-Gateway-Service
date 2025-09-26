import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayCountryModule } from './country/gateway-country.module';
import { GatewayAuthModule } from './auth/gateway-auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    GatewayCountryModule,
    GatewayAuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 10000, //1 sec
        limit: 4,
      },
      {
        name: 'medium',
        ttl: 50000, // 1 sec
        limit: 10
      }
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }

  ],
})
export class AppModule { }
