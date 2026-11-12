import { Injectable , ConflictException, NotFoundException,InternalServerErrorException,} from '@nestjs/common';
import { CreateCourseParticipantDto , UpdateCourseParticipantDto} from './dto/course-participant.dto';
import { CreateLessonParticipantDto, UpdateLessonParticipantDto } from './dto/lesson-participant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CourseParticipant, CourseParticipantDocument } from './schema/course-participant.schema';
import { LessonParticipant, LessonParticipantDocument } from './schema/lesson-participant.schema';
import { Model } from 'mongoose';

@Injectable()
export class ParticipantService {
  constructor(
        @InjectModel(CourseParticipant.name) private cpModel: Model<CourseParticipantDocument>,
        @InjectModel(LessonParticipant.name) private lpModel: Model<LessonParticipantDocument>,
      ) {}


  async createCourseParticipant(dto: CreateCourseParticipantDto): Promise<CourseParticipant> {
    try {
      // ۱. بررسی اینکه آیا کاربر قبلاً در این دوره ثبت‌نام کرده است یا خیر
      const existingParticipant = await this.cpModel.findOne({
        userId: dto.userId,
        courseWpId: dto.courseWpId,
      });

      if (existingParticipant) {
        throw new ConflictException('شما قبلاً در این دوره ثبت‌نام کرده‌اید.');
      }


      // ۳. ساخت رکورد جدید با مقادیر پیش‌فرض (در صورتی که کاربر مقداری ارسال نکرده باشد)
      const newParticipant = new this.cpModel({
        userId: dto.userId,
        courseWpId: dto.courseWpId,
        completed_steps: dto.completed_steps ?? 0,
        progress_percent: dto.progress_percent ?? 0,
      });

      // ۴. ذخیره در دیتابیس و بازگرداندن نتیجه
      const savedParticipant = await newParticipant.save();
      
      return savedParticipant;

    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      
      console.error('Error creating course participant:', error);
      throw new InternalServerErrorException('خطایی در ثبت‌نام دوره رخ داد.');
    }
  }

  


  async createLessonParticipant(dto: CreateLessonParticipantDto): Promise<LessonParticipant> {
    try {
      // ۱. بررسی اینکه آیا کاربر قبلاً در این درس ثبت‌نام/شروع کرده است یا خیر
      const existingParticipant = await this.lpModel.findOne({
        userId: dto.userId,
        lessonId: dto.lessonId,
      });

      if (existingParticipant) {
        throw new ConflictException('شما قبلاً این درس را شروع کرده‌اید.');
      }


      // ۳. ساخت رکورد جدید با مقادیر پیش‌فرض
      const newParticipant = new this.lpModel({
        userId: dto.userId,
        lessonId: dto.lessonId,
        completed: dto.completed ?? false,
        progress_percent: dto.progress_percent ?? 0,
      });

      // ۴. ذخیره در دیتابیس و بازگرداندن نتیجه
      const savedParticipant = await newParticipant.save();
      
      return savedParticipant;

    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      
      console.error('Error creating lesson participant:', error);
      throw new InternalServerErrorException('خطایی در ثبت‌نام درس رخ داد.');
    }
  }


}
