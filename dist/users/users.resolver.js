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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entities/user.entity");
const create_user_input_1 = require("./dto/create-user.input");
const update_user_input_1 = require("./dto/update-user.input");
const gql_auth_guard_1 = require("../guards/gql-auth.guard");
const fs_1 = require("fs");
const fs = require("fs");
const path_1 = require("path");
const graphql_upload_1 = require("graphql-upload");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(createUserInput) {
        return this.usersService.create(createUserInput);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOneByParams(id, idPassport, email, name, phone, imgPassport, isVerified) {
        const queryParams = {};
        if (id)
            queryParams.id = id;
        if (idPassport)
            queryParams.idPassport = idPassport;
        if (email)
            queryParams.email = email;
        if (name)
            queryParams.name = name;
        if (phone)
            queryParams.phone = phone;
        if (imgPassport)
            queryParams.imgPassport = imgPassport;
        if (isVerified)
            queryParams.isVerified = isVerified;
        return this.usersService.findOneByParams(queryParams);
    }
    updateUser(updateUserInput) {
        return this.usersService.update(updateUserInput.id, updateUserInput);
    }
    removeUser(id) {
        return this.usersService.remove(id);
    }
    async uploadUserPassport(id, file) {
        console.log('users.resolver: Received file - ', file);
        const { createReadStream, filename } = file;
        const folderPath = (0, path_1.join)(process.cwd(), 'uploads');
        const filePath = (0, path_1.join)(folderPath, `${id}-${filename}`);
        try {
            if (!fs.existsSync(folderPath))
                fs.mkdirSync(folderPath, { recursive: true });
            const stream = createReadStream();
            const writeStream = (0, fs_1.createWriteStream)(filePath);
            stream.pipe(writeStream);
            await new Promise((resolve, reject) => {
                writeStream.on('finish', resolve);
                writeStream.on('error', reject);
            });
            console.log(`File saved to ${filePath}`);
            return true;
        }
        catch (error) {
            console.error('File upload failed:', error);
            return false;
        }
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'user', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('idPassport', { nullable: true })),
    __param(2, (0, graphql_1.Args)('email', { nullable: true })),
    __param(3, (0, graphql_1.Args)('name', { nullable: true })),
    __param(4, (0, graphql_1.Args)('phone', { nullable: true })),
    __param(5, (0, graphql_1.Args)('imgPassport', { nullable: true })),
    __param(6, (0, graphql_1.Args)('isVerified', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String, String, Boolean]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "findOneByParams", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('updateUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "removeUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('file', { type: () => graphql_upload_1.GraphQLUpload })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_a = typeof graphql_upload_1.FileUpload !== "undefined" && graphql_upload_1.FileUpload) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "uploadUserPassport", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map