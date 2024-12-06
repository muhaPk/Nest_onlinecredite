import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  findOneByParams(
    @Args('id', { type: () => Int, nullable: true }) id?: number,
    @Args('idPassport', { nullable: true }) idPassport?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('phone', { nullable: true }) phone?: string,
    @Args('isVerified', { nullable: true }) isVerified?: boolean,
  ) {
    // Build the query parameters dynamically based on provided args
    const queryParams: any = {};

    if (id) queryParams.id = id;
    if (idPassport) queryParams.idPassport = idPassport;
    if (email) queryParams.email = email;
    if (name) queryParams.name = name;
    if (phone) queryParams.phone = phone;
    if (isVerified) queryParams.isVerified = isVerified;

    return this.usersService.findOneByParams(queryParams);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
