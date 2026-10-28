import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
//import { InboxModule } from './gtd-app/inbox/inbox.module';
//import { ProjectsModule } from './gtd-app/projects/projects.module';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';
//import { ZiresefrConnectionModule } from './ziresefr-app/ziresefr_connection/ziresefr_connection.module';
import { RouterModule } from '@nestjs/core';
import { GtdModule } from './gtd-app/gtd.module';
import { ZiresefrModule } from './ziresefr-app/ziresefr.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/gtd-planning-v1-db1'),
    AuthModule,
    UsersModule,
    AiModule,
    GtdModule,
    ZiresefrModule,

    

    RouterModule.register([
      { path:'gtd', module: GtdModule },
      { path: 'ziresefr', module: ZiresefrModule },
    ]),

    

    

  
    


  ],
  controllers: [AppController,],
  providers: [AppService],
})

export class AppModule {}
