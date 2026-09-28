import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, Projectchema } from './schema/project.schema';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';




@Module({
  imports: [
      MongooseModule.forFeature([
        { name:Project.name, schema:Projectchema },
      ]),
      UsersModule,
    ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})

export class ProjectsModule {}
