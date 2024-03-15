import { Module } from '@nestjs/common';
import { CreService } from './cre.service';
import { CreController } from './cre.controller';

@Module({
  controllers: [CreController],
  providers: [CreService],
})
export class CreModule {}
