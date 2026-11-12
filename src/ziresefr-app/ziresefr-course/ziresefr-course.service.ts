import { Injectable } from '@nestjs/common';
import { CreateZiresefrCourseDto } from './dto/create-ziresefr-course.dto';
import { UpdateZiresefrCourseDto } from './dto/update-ziresefr-course.dto';
import { Course, CourseDocument } from './schema/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RagService } from 'src/ai-app/rag/rag.service';
import { IngestService } from 'src/ai-app/rag/services/ingest/ingest.service';
import { Lesson, LessonDocument } from './schema/lesson.schema';


@Injectable()
export class ZiresefrCourseService {
  constructor(
      @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
      @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
      private ingestService: IngestService,
    ) {}

  /*async ingestCourses() {
    const courses = await this.courseModel.find().populate('')
  }*/


  async create(dto: CreateZiresefrCourseDto) : Promise<Course | null> {
    const nw = new this.courseModel(dto);
    const saved = await nw.save();
    return saved;
  }

  async createMany(body: CreateZiresefrCourseDto[]): Promise<Number> {
    const nws = await this.courseModel.insertMany(body);
    return nws.length;
  }


  async findAllCourses() : Promise<Course[]> {
    const crs = await this.courseModel.find().populate('lessons');
    return crs;
  }


  async findCoursesByWpIds(wpIds:number[]) : Promise<Course[]> {
    const crs = await this.courseModel
      .find({ wp_id: { $in: wpIds } })
      .populate('lessons')
      .lean();
    return crs;
  }


  async findAllLessons() : Promise<Lesson[]> {
    const crs = await this.lessonModel.find();
    return crs;
  }


  async chunkCourses() {
    const courses = await this.courseModel.find();
    
    const formalCourses = courses.map((c) => ({
      id: String(c._id),
      title: c.title,
      content: c.description ,
      type: 'course'
    }));

    await this.ingestService.ingestMany(formalCourses);
  }


  async deleteMany() : Promise<Number> {
    const deleted = await this.courseModel.deleteMany();
    return deleted.deletedCount;
  }


  async replaceAll(courses: any[]) {
    //const session = await this.courseModel.db.startSession();

    try {
      let deletedCount = 0;
      let insertedCount = 0;

      //await session.withTransaction(async () => {
        const deleted = await this.courseModel.deleteMany(); // , { session }

        deletedCount = deleted.deletedCount;

        const inserted = await this.courseModel.insertMany(
          courses,
        );   //{ session }

        insertedCount = inserted.length;
      //});

      return {
        deletedCount,
        insertedCount,
      };

    } finally {
      //await session.endSession();
    }
  }


  
  async replaceAll2(courses: any[]) {
    try {

      const deletedCourses = await this.courseModel.deleteMany({});
      const deletedLessons = await this.lessonModel.deleteMany({});
      
      if (!courses || courses.length === 0) {
        return {
          deletedCoursesCount: deletedCourses.deletedCount,
          deletedLessonsCount: deletedLessons.deletedCount,
          insertedCoursesCount: 0,
          insertedLessonsCount: 0,
        };
      }

      const coursesToInsert: any[] = [];
      const lessonsByCourseWpId = new Map<number, any[]>();

      for (const course of courses) {
        const { lessons, ...courseData } = course;
        
        coursesToInsert.push({
          ...courseData,
          lessons: [], 
        });

        if (lessons && Array.isArray(lessons)) {
          lessonsByCourseWpId.set(course.wp_id, lessons);
        }
      }

      const insertedCourses: any[] = await this.courseModel.insertMany(coursesToInsert);

      const lessonsToInsert: any[] = [];

      for (const newCourse of insertedCourses) {
        const courseLessons = lessonsByCourseWpId.get(newCourse.wp_id) || [];
        
        for (const lesson of courseLessons) {
          lessonsToInsert.push({
            ...lesson,
            course_id: newCourse.wp_id, 
          });
        }
      }

      let insertedLessons: any[] = [];
      if (lessonsToInsert.length > 0) {
        insertedLessons = await this.lessonModel.insertMany(lessonsToInsert);
      }

      const updatePromises = insertedCourses.map((newCourse) => {

        const thisCourseLessonIds = insertedLessons
          .filter((l) => l.course_id === newCourse.wp_id)
          .map((l) => l._id) //.toString()); 

        return this.courseModel.updateOne(
          { _id: newCourse._id },
          { $set: { lessons: thisCourseLessonIds } }
        );
      });

      await Promise.all(updatePromises);

      return {
        deletedCoursesCount: deletedCourses.deletedCount,
        deletedLessonsCount: deletedLessons.deletedCount,
        insertedCoursesCount: insertedCourses.length,
        insertedLessonsCount: insertedLessons.length,
        status: 'success',
      };

    } catch (error) {
      throw error;
    }
  }

  /*async getCoursesWithSelectedLessons(requestedData: RequestedCourseDto[]) {
    const courseWpIds = requestedData.map(item => item.wp_id);

    const courses = await this.courseModel.find({ wp_id: { $in: courseWpIds } }).lean();

    
    const requestedLessonsMap = new Map<number, number[]>();
    requestedData.forEach(item => {
      requestedLessonsMap.set(item.wp_id, item.lessons);
    });

    const result = await Promise.all(
      courses.map(async (course) => {
        const requiredLessonWpIds = requestedLessonsMap.get(course.wp_id) || [];

        const lessons = await this.lessonModel
          .find({ 
            courseId: course._id,          
            wp_id: { $in: requiredLessonWpIds }
          })
          .select('_id wp_id title description order') 
          .lean();

        return {
          ...course, 
          lessons: lessons, 
        };
      })
    );

    return result;
  }*/

}
