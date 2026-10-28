import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrProductsService } from './ziresefr-products.service';

describe('ZiresefrProductsService', () => {
  let service: ZiresefrProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZiresefrProductsService],
    }).compile();

    service = module.get<ZiresefrProductsService>(ZiresefrProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
