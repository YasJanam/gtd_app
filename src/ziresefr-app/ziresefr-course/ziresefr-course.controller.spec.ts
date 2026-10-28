import { Test, TestingModule } from '@nestjs/testing';
import { ZiresefrCourseController } from './ziresefr-course.controller';
import { ZiresefrCourseService } from './ziresefr-course.service';

describe('ZiresefrCourseController', () => {
  let controller: ZiresefrCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZiresefrCourseController],
      providers: [ZiresefrCourseService],
    }).compile();

    controller = module.get<ZiresefrCourseController>(ZiresefrCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
