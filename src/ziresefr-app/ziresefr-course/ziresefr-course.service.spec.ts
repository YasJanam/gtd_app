import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrCourseService } from './ziresefr-course.service';

describe('ZiresefrCourseService', () => {
  let service: ZiresefrCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZiresefrCourseService],
    }).compile();

    service = module.get<ZiresefrCourseService>(ZiresefrCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
