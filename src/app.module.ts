import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
// @ts-ignore
import { GraphQLUpload } from 'graphql-upload';

import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), './schema.gql'),
        sortSchema: true,
        resolvers: { Upload: GraphQLUpload }, // Add this
        //csrfPrevention: false, // Disable CSRF prevention
      }),
      UsersModule,
      AuthModule,
    ],
    controllers: [AppController],
  })
  export class AppModule {}