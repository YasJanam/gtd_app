import { PartialType } from '@nestjs/swagger';
import { CreateZiresefrCourseDto } from './create-ziresefr-course.dto';

export class UpdateZiresefrCourseDto extends PartialType(CreateZiresefrCourseDto) {}
