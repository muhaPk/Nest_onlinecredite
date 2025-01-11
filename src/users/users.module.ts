import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
})
export class UsersModule {}
