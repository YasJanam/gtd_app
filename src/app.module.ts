import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { InboxModule } from './inbox/inbox.module';
import { ProjectsModule } from './projects/projects.module';
import { AiModule } from './ai/ai.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/gtd-planning-v1-db1'),
    AuthModule,
    UsersModule,
    InboxModule,
    ProjectsModule,
    AiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
