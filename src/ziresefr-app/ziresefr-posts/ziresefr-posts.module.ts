import { Module } from '@nestjs/common';
import { ZiresefrPostsService } from './ziresefr-posts.service';
import { ZiresefrPostsController } from './ziresefr-posts.controller';
import { PostSchema } from './schema/post.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]) 
  ],
  controllers: [ZiresefrPostsController],
  providers: [ZiresefrPostsService],
})

export class ZiresefrPostsModule {}
