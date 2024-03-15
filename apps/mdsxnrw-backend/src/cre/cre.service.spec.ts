import { Test, TestingModule } from '@nestjs/testing';
import { CreService } from './cre.service';

describe('CreService', () => {
  let service: CreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreService],
    }).compile();

    service = module.get<CreService>(CreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
