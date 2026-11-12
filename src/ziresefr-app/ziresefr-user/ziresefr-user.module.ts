import { Module } from '@nestjs/common';
import { ZiresefrUserService } from './ziresefr-user.service';
import { ZiresefrUserController } from './ziresefr-user.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { LearningPathSchema } from './schema/learning-path.schema';
import { ZiresefrCourseModule } from '../ziresefr-course/ziresefr-course.module';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'LearningPath', schema: LearningPathSchema }]) ,

      ZiresefrCourseModule,
      
    ],
  controllers: [ZiresefrUserController],
  providers: [ZiresefrUserService],
})
export class ZiresefrUserModule {}
