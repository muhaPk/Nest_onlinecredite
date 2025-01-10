import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
// @ts-ignore
import { GraphQLUpload } from 'graphql-upload';

@Module({
    imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        resolvers: { Upload: GraphQLUpload }, // Add this
        //csrfPrevention: false, // Disable CSRF prevention
      }),
      UsersModule,
      AuthModule,
    ],
  })
  export class AppModule {}