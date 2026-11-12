import { Module } from '@nestjs/common';
import { ZiresefrConnectionModule } from './ziresefr_connection/ziresefr_connection.module';
import { ZiresefrCourseModule } from './ziresefr-course/ziresefr-course.module';
import { ZiresefrPostsModule } from './ziresefr-posts/ziresefr-posts.module';
import { ZiresefrProductsModule } from './ziresefr-products/ziresefr-products.module';
import { ZiresefrUserModule } from './ziresefr-user/ziresefr-user.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [
    ZiresefrConnectionModule,
    ZiresefrCourseModule,
    ZiresefrPostsModule,
    ZiresefrProductsModule,
    ZiresefrUserModule,
    ParticipantModule,
  ],
})
export class ZiresefrModule {}