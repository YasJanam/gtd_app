import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseParticipantSchema } from './schema/course-participant.schema';
import { LessonParticipantSchema } from './schema/lesson-participant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CourseParticipant', schema: CourseParticipantSchema }]) ,
    MongooseModule.forFeature([{ name: 'LessonParticipant', schema: LessonParticipantSchema }]) ,
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
