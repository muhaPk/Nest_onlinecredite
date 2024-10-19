import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true, 
    }),
  ],

  providers: [UsersResolver, UsersService, PrismaService],
})
export class UsersModule {}
