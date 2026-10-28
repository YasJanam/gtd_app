import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrPostsService } from './ziresefr-posts.service';

describe('ZiresefrPostsService', () => {
  let service: ZiresefrPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZiresefrPostsService],
    }).compile();

    service = module.get<ZiresefrPostsService>(ZiresefrPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
