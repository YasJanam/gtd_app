import { Injectable } from '@nestjs/common';
import { CreateZiresefrCourseDto } from './dto/create-ziresefr-course.dto';
import { UpdateZiresefrCourseDto } from './dto/update-ziresefr-course.dto';

@Injectable()
export class ZiresefrCourseService {
  create(createZiresefrCourseDto: CreateZiresefrCourseDto) {
    return 'This action adds a new ziresefrCourse';
  }

  findAll() {
    return `This action returns all ziresefrCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ziresefrCourse`;
  }

  update(id: number, updateZiresefrCourseDto: UpdateZiresefrCourseDto) {
    return `This action updates a #${id} ziresefrCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} ziresefrCourse`;
  }
}
