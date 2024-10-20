import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.setGlobalPrefix('api');
  await app.listen(4200);
}
bootstrap();
