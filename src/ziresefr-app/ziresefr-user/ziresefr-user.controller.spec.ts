import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrUserController } from './ziresefr-user.controller';
import { ZiresefrUserService } from './ziresefr-user.service';

describe('ZiresefrUserController', () => {
  let controller: ZiresefrUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZiresefrUserController],
      providers: [ZiresefrUserService],
    }).compile();

    controller = module.get<ZiresefrUserController>(ZiresefrUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
