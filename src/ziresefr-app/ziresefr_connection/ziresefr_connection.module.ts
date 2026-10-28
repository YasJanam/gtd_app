import { Module } from '@nestjs/common';
import { ZiresefrConnectionService } from './ziresefr_connection.service';
import { ZiresefrConnectionController } from './ziresefr_connection.controller';
import { CoursesController } from './courses-controller/courses.controller';
import { WpusersController } from './wpusers-controller/wpusers.controller';

@Module({
  controllers: [
    ZiresefrConnectionController,
    CoursesController,
    WpusersController,
  ],
  providers: [ZiresefrConnectionService],
})

export class ZiresefrConnectionModule {}
