import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { Prisma } from '@prisma/client';
import {
  AuthenticatedUser,
  Public,
  Roles,
  RoleMatchingMode,
  Unprotected,
} from 'nest-keycloak-connect';

@Controller('api/connector')
export class ConnectorController {
  constructor(private readonly connectorService: ConnectorService) {}

  @Get()
  @Public(true)
  findAll() {
    return this.connectorService.findAll();
  }

  @Get(':id')
  @Public(true)
  findOne(@Param('id') id: string) {
    return this.connectorService.findOne(+id);
  }

  @Post()
  @Roles({ roles: ['realm:admin'] })
  create(@Body() connectorCreateInput: Prisma.ConnectorCreateInput) {
    return this.connectorService.create(connectorCreateInput);
  }

  @Patch(':id')
  @Roles({ roles: ['realm:admin'] })
  update(
    @Param('id') id: string,
    @Body() connectorUpdateInput: Prisma.ConnectorUpdateInput,
  ) {
    return this.connectorService.update(+id, connectorUpdateInput);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:admin'] })
  remove(@Param('id') id: string) {
    return this.connectorService.remove(+id);
  }
}
