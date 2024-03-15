import { Module } from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { ConnectorController } from './connector.controller';

@Module({
  controllers: [ConnectorController],
  providers: [ConnectorService],
})
export class ConnectorModule {}
