import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FileUpload } from 'graphql-upload';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): Promise<{
        idPassport: string;
        name: string;
        surname: string;
        email: string;
        phone: string;
        imgPassport: string;
        isVerified: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        idPassport: string | null;
        name: string | null;
        surname: string | null;
        email: string | null;
        phone: string | null;
        imgPassport: string | null;
        isVerified: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOneByParams(id?: number, idPassport?: string, email?: string, name?: string, phone?: string, imgPassport?: string, isVerified?: boolean): Promise<{
        idPassport: string | null;
        name: string | null;
        surname: string | null;
        email: string | null;
        phone: string | null;
        imgPassport: string | null;
        isVerified: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(updateUserInput: UpdateUserInput): Promise<{
        idPassport: string;
        name: string;
        surname: string;
        email: string;
        phone: string;
        imgPassport: string;
        isVerified: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeUser(id: number): Promise<{
        idPassport: string;
        name: string;
        surname: string;
        email: string;
        phone: string;
        imgPassport: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadUserPassport(id: number, file: FileUpload): Promise<boolean>;
}
