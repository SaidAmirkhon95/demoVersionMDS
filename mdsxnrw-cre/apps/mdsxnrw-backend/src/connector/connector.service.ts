import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, CompanyIndustrySector } from '@prisma/client';
import { createNestedMiddleware } from 'prisma-nested-middleware';
import { z } from 'zod';

const prisma = new PrismaClient();

//validation
prisma.$use(
  createNestedMiddleware((params, next) => {
    // case: create Connector
    if (params.model === 'Connector' && params.action === 'create') {
      if (
        !z.string().email().safeParse(params.args.data.connectorEmail).success
      ) {
        throw new Error('invalid email.');
      }
      if (params.args.data.deploymentType.length <= 0) {
        throw new Error('At least one deployment type is required.');
      }
      if (params.args.data.usedProtocols.length <= 0) {
        throw new Error('At least one used protocol is required.');
      }
      // if no targetIndustrySectors is provided then autofill with all values
      if (
        params.args.data.targetIndustrySectors == undefined ||
        params.args.data.targetIndustrySectors.length <= 0
      ) {
        const allTargetIndustrySectors: string[] = [];
        Object.keys(CompanyIndustrySector).forEach((key) => {
          allTargetIndustrySectors.push(CompanyIndustrySector[key]);
        });
        params.args.data.targetIndustrySectors = allTargetIndustrySectors;
      }
      // bypass object if no errors were thrown
      return next(params);
    }
    // case: update Connector
    else if (params.model === 'Connector' && params.action === 'update') {
      if (
        params.args.data.connectorEmail != undefined &&
        !z.string().email().safeParse(params.args.data.connectorEmail).success
      ) {
        throw new Error('invalid email.');
      }
      if (
        params.args.data.deploymentType != undefined &&
        params.args.data.deploymentType.length <= 0
      ) {
        throw new Error('At least one deployment type is required.');
      }
      if (
        params.args.data.usedProtocols != undefined &&
        params.args.data.usedProtocols.length <= 0
      ) {
        throw new Error('At least one used protocol is required.');
      }
      // if targetIndustrySectors is empty then autofill with all targetIndustrySectors
      if (
        params.args.data.targetIndustrySectors != undefined &&
        params.args.data.targetIndustrySectors.length <= 0
      ) {
        const allTargetIndustrySectors: string[] = [];
        Object.keys(CompanyIndustrySector).forEach((key) => {
          allTargetIndustrySectors.push(CompanyIndustrySector[key]);
        });
        params.args.data.targetIndustrySectors = allTargetIndustrySectors;
      }
      // bypass object if no errors were thrown
      return next(params);
    }
    // if method is not create or update, bypass middleware
    return next(params);
  }),
);

@Injectable()
export class ConnectorService {
  create(createConnectorDto: Prisma.ConnectorCreateInput) {
    return prisma.connector.create({ data: createConnectorDto });
  }

  findAll() {
    return prisma.connector.findMany();
  }

  findOne(id: number) {
    return prisma.connector.findFirst({ where: { id } });
  }

  update(id: number, updateConnectorDto: Prisma.ConnectorUpdateInput) {
    return prisma.connector.update({ where: { id }, data: updateConnectorDto });
  }

  remove(id: number) {
    return prisma.connector.delete({ where: { id } });
  }
}
