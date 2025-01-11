"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const graphql_upload_1 = require("graphql-upload");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 1000000, maxFiles: 10 }));
    await app.listen(process.env.SERVER_PORT || 4200, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map