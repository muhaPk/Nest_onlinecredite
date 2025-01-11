"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.user.create({
            data,
            select: {
                id: true,
                idPassport: true,
                email: true,
                name: true,
                surname: true,
                phone: true,
                imgPassport: true,
                isVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findAll() {
        return this.prisma.user.findMany();
    }
    async findOneByParams(params) {
        return this.prisma.user.findFirst({
            where: params,
        });
    }
    async update(id, updateUserInput) {
        const data = {};
        if (updateUserInput.email) {
            data.email = updateUserInput.email;
        }
        if (updateUserInput.idPassport) {
            data.idPassport = updateUserInput.idPassport;
        }
        if (updateUserInput.name) {
            data.name = updateUserInput.name;
        }
        if (updateUserInput.surname) {
            data.surname = updateUserInput.surname;
        }
        if (updateUserInput.phone) {
            data.phone = updateUserInput.phone;
        }
        if (updateUserInput.imgPassport) {
            data.imgPassport = updateUserInput.imgPassport;
        }
        if (updateUserInput.isVerified !== undefined) {
            data.isVerified = updateUserInput.isVerified;
        }
        return this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                idPassport: true,
                email: true,
                name: true,
                surname: true,
                phone: true,
                imgPassport: true,
                isVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.user.delete({
            where: { id },
            select: {
                id: true,
                idPassport: true,
                email: true,
                name: true,
                surname: true,
                phone: true,
                imgPassport: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map