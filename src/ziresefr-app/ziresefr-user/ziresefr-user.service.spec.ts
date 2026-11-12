import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrUserService } from './ziresefr-user.service';

describe('ZiresefrUserService', () => {
  let service: ZiresefrUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZiresefrUserService],
    }).compile();

    service = module.get<ZiresefrUserService>(ZiresefrUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
