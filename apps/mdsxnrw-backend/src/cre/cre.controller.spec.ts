import { Test, TestingModule } from '@nestjs/testing';
import { CreController } from './cre.controller';
import { CreService } from './cre.service';

describe('CreController', () => {
  let controller: CreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreController],
      providers: [CreService],
    }).compile();

    controller = module.get<CreController>(CreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
