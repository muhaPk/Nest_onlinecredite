import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return 'NestJS GraphQL Server is running!';
  }
}
