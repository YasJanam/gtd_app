import { Test, TestingModule } from '@nestjs/testing';
import { WpusersController } from './wpusers.controller';

describe('WpusersController', () => {
  let controller: WpusersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WpusersController],
    }).compile();

    controller = module.get<WpusersController>(WpusersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
