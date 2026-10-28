import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZiresefrCourseService } from './ziresefr-course.service';
import { CreateZiresefrCourseDto } from './dto/create-ziresefr-course.dto';
import { UpdateZiresefrCourseDto } from './dto/update-ziresefr-course.dto';

@Controller('ziresefr-course')
export class ZiresefrCourseController {
  constructor(private readonly ziresefrCourseService: ZiresefrCourseService) {}

  @Post()
  create(@Body() createZiresefrCourseDto: CreateZiresefrCourseDto) {
    return this.ziresefrCourseService.create(createZiresefrCourseDto);
  }

  @Get()
  findAll() {
    return this.ziresefrCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ziresefrCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZiresefrCourseDto: UpdateZiresefrCourseDto) {
    return this.ziresefrCourseService.update(+id, updateZiresefrCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ziresefrCourseService.remove(+id);
  }
}
