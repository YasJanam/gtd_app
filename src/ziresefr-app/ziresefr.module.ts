import { Module } from '@nestjs/common';
import { ZiresefrConnectionModule } from './ziresefr_connection/ziresefr_connection.module';
import { ZiresefrCourseModule } from './ziresefr-course/ziresefr-course.module';
import { ZiresefrPostsModule } from './ziresefr-posts/ziresefr-posts.module';
import { ZiresefrProductsModule } from './ziresefr-products/ziresefr-products.module';

@Module({
  imports: [
    ZiresefrConnectionModule,
    ZiresefrCourseModule,
    ZiresefrPostsModule,
    ZiresefrProductsModule,
  ],
})
export class ZiresefrModule {}