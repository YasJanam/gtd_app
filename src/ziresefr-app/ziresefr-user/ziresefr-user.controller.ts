import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ZiresefrUserService } from './ziresefr-user.service';
import { CreateZiresefrUserDto } from './dto/create-ziresefr-user.dto';
import { UpdateZiresefrUserDto } from './dto/update-ziresefr-user.dto';
import { CreateLearningPathDto } from './dto/create-learning-path.dto';

@Controller('ziresefr-user')
export class ZiresefrUserController {
  constructor(private readonly ziresefrUserService: ZiresefrUserService) {}

  @Post('learning-path')
  async createLearningPath(@Body() dto: CreateLearningPathDto) {
    return this.ziresefrUserService.createLearningPath(dto);
  }

  @Get('learning-path')
  async getLearningPath(@Query('userId') userId: string) {
    return this.ziresefrUserService.getLearningPath(userId);
  }

  @Get('learning-paths')
  async getLearningPaths() {
    return this.ziresefrUserService.getLearningPaths();
  }
  
 
}
