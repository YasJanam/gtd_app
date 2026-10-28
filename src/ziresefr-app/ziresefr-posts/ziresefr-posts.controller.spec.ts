import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrPostsController } from './ziresefr-posts.controller';
import { ZiresefrPostsService } from './ziresefr-posts.service';

describe('ZiresefrPostsController', () => {
  let controller: ZiresefrPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZiresefrPostsController],
      providers: [ZiresefrPostsService],
    }).compile();

    controller = module.get<ZiresefrPostsController>(ZiresefrPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
