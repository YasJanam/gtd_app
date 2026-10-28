import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrConnectionController } from './ziresefr_connection.controller';
import { ZiresefrConnectionService } from './ziresefr_connection.service';

describe('ZiresefrConnectionController', () => {
  let controller: ZiresefrConnectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZiresefrConnectionController],
      providers: [ZiresefrConnectionService],
    }).compile();

    controller = module.get<ZiresefrConnectionController>(ZiresefrConnectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
