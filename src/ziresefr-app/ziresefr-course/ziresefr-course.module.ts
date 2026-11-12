import { Module } from '@nestjs/common';
import { ZiresefrCourseService } from './ziresefr-course.service';
import { ZiresefrCourseController } from './ziresefr-course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';
import { IngestService } from 'src/ai-app/rag/services/ingest/ingest.service';
import { RagModule } from 'src/ai-app/rag/rag.module';
import { LessonSchema } from './schema/lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]) ,
    MongooseModule.forFeature([{ name: 'Lesson', schema: LessonSchema }]) ,

    RagModule,
  ],

  controllers: [ZiresefrCourseController],
  providers: [
    ZiresefrCourseService,
    //IngestService,
  ],
  exports:[
    ZiresefrCourseService,
  ]
})
export class ZiresefrCourseModule {}
