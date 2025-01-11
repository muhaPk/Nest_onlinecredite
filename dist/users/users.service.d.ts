import { PrismaService } from '../prisma.service';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
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
    findOneByParams(params: any): Promise<{
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
    update(id: number, updateUserInput: UpdateUserInput): Promise<{
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
    remove(id: number): Promise<{
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
}
