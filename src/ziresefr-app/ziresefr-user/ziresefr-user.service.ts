import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LearningPath, LearningPathDocument } from './schema/learning-path.schema';
import { CreateLearningPathDto } from './dto/create-learning-path.dto';
import { Course, CourseDocument } from '../ziresefr-course/schema/course.schema';
import { ZiresefrCourseService } from '../ziresefr-course/ziresefr-course.service';


@Injectable()
export class ZiresefrUserService {
  constructor(
    @InjectModel(LearningPath.name) private readonly learningPathModel: Model<LearningPathDocument>,
    //@InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    private courseService: ZiresefrCourseService,

  ) {}

  async createLearningPath(dto: CreateLearningPathDto) {
    try {
      const existingPath = await this.learningPathModel.findOne({ userId: dto.userId });


      const courseIds = dto.courses.map((c) => Number(c.wp_id));

      const populatedCourses = await this.courseService.findCoursesByWpIds(courseIds);

      let courses = populatedCourses.map((course) => {
        let requestedCourse = dto.courses.find(
          (c:any) => Number(c.wp_id) === Number(course.wp_id)
        )

        let lessonWpIds = requestedCourse?.lessons.map((l) => Number(l.wp_id));

        const requestedLessons = course.lessons.filter(
          (l: any) => lessonWpIds?.includes(l.wp_id)
        );

        let less = requestedLessons.map((l) => ({
          wp_id:l.wp_id,
          title: l.title,
          wp_url: l.wp_url
        }));

        return ({
          title: course.title,
          wp_id:course.wp_id,
          lessons:less,
          description: course.description,
          wp_url:course.wp_url,
        })
      })

      if (existingPath) {
        existingPath.courses = courses;
        await existingPath.save();
        
        return {
          message: 'مسیر یادگیری با موفقیت به‌روزرسانی شد.',
          data: existingPath,
        };
      }

      const newPath = new this.learningPathModel({
        userId: dto.userId,
        courses: dto.courses,
      });

      const savedPath = await newPath.save();

      return {
        message: 'مسیر یادگیری جدید با موفقیت ساخته شد.',
        data: savedPath,
      };

    } catch (error) {
      console.error('Error creating learning path:', error);
      throw new InternalServerErrorException('خطایی در ذخیره مسیر یادگیری رخ داد');
    }
  }



   async getLearningPath(userId: string) : Promise<LearningPath | null> {
    try {
      const existingPath = await this.learningPathModel.findOne({ userId: userId });
      return existingPath;

    } catch (error) {
      console.error('Error creating learning path:', error);
      throw new InternalServerErrorException('خطایی در ذخیره مسیر یادگیری رخ داد');
    }
  }


  async getLearningPaths() : Promise<LearningPath[]> {
    try {
      const existingPath = await this.learningPathModel.find();
      return existingPath;

    } catch (error) {
      console.error('Error creating learning path:', error);
      throw new InternalServerErrorException('خطایی در ذخیره مسیر یادگیری رخ داد');
    }
  }
}