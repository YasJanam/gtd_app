import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrConnectionService } from './ziresefr_connection.service';

describe('ZiresefrConnectionService', () => {
  let service: ZiresefrConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZiresefrConnectionService],
    }).compile();

    service = module.get<ZiresefrConnectionService>(ZiresefrConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
