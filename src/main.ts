import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// @ts-ignore
import { graphqlUploadExpress } from 'graphql-upload';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(graphqlUploadExpress({maxFileSize: 1000000, maxFiles: 10 }));

  app.setGlobalPrefix('api');
  await app.listen(process.env.SERVER_PORT || 4200, '0.0.0.0');
}
bootstrap();
