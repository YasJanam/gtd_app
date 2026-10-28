import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrProductsController } from './ziresefr-products.controller';
import { ZiresefrProductsService } from './ziresefr-products.service';

describe('ZiresefrProductsController', () => {
  let controller: ZiresefrProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZiresefrProductsController],
      providers: [ZiresefrProductsService],
    }).compile();

    controller = module.get<ZiresefrProductsController>(ZiresefrProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
