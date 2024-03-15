import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AuthenticatedUser,
  Public,
  Roles,
  RoleMatchingMode,
  Unprotected,
} from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/hello')
  @Public(true)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/test/authentication')
  @Roles({ roles: ['realm:user', 'realm:admin'] })
  getUser(): string {
    return `Hello authenticated user!`;
  }
}
