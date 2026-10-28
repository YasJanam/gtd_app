import { Module } from '@nestjs/common';
import { ZiresefrCourseService } from './ziresefr-course.service';
import { ZiresefrCourseController } from './ziresefr-course.controller';

@Module({
  controllers: [ZiresefrCourseController],
  providers: [ZiresefrCourseService],
})
export class ZiresefrCourseModule {}
