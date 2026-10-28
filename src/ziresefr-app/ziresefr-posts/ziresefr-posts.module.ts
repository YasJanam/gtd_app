import { Module } from '@nestjs/common';
import { ZiresefrPostsService } from './ziresefr-posts.service';
import { ZiresefrPostsController } from './ziresefr-posts.controller';

@Module({
  controllers: [ZiresefrPostsController],
  providers: [ZiresefrPostsService],
})
export class ZiresefrPostsModule {}
