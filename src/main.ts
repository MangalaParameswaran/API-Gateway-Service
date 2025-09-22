import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
  await app.listen(process.env.PORT ?? 3000);
  console.log('API gateway is running in the port 3000')
}
bootstrap();
