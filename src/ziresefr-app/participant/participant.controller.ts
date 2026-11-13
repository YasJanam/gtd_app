import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateCourseParticipantDto } from './dto/course-participant.dto';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  create(@Body() createParticipantDto: CreateCourseParticipantDto) {
    return this.participantService.createCourseParticipant(createParticipantDto);
  }

}
