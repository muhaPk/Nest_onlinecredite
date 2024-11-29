import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';


@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}

  async create(data: any) {
    
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

  }


  // Playground:
  // mutation CreateUser {
  //   createUser (createUserInput: { email: "user@example.com", name: "user", phone: 333 }) {
  //     id
  //   }
  // }



  async findAll() {
    return this.prisma.user.findMany()
  }

  // Playground:
  // query {
  //   users {
  //     id
  //   }
  // }



  async findOneByParams(params: any) {
    return this.prisma.user.findFirst({
      where: params,  // Filter by passed parameters
    });
  }


  // Playground:
  // query {
  //   user(name: "Jaclin") {
  //     id
  //   }
  // }
  

  async update(id: number, updateUserInput: UpdateUserInput) {

    const data: any = {};  // Create an empty object for the update data

    // Only update fields that are provided
    if (updateUserInput.email) {
      data.email = updateUserInput.email;
    }
    if (updateUserInput.name) {
      data.name = updateUserInput.name;
    }
    if (updateUserInput.phone) {
      data.phone = updateUserInput.phone;
    }
    
    if (updateUserInput.isVerified !== undefined) {
      data.isVerified = updateUserInput.isVerified;
    }

    return this.prisma.user.update({
      where: { id },  // Find user by id
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }


  // Playground:
  // mutation UpdateUser {
  //   updateUser(updateUserInput: { id:1, name: "New Name 3" }) {
  //     id
  //   }
  // }



  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },  // Find and delete user by id
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }


  // Playground:
  // mutation RemoveUser {
  //   removeUser(id: 1) {
  //     id
  //   }
  // }


}
