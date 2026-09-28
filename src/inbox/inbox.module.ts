import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxController } from './inbox.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InboxItem, InboxItemSchema } from './schema/item.schema';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { ProjectsService } from 'src/projects/projects.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name:InboxItem.name, schema:InboxItemSchema },
    ]),
    UsersModule,
    ProjectsModule,
  ],
  controllers: [InboxController],
  providers: [InboxService],
  exports: [InboxService],
})

export class InboxModule {}
