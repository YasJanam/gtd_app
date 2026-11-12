// src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { AiService } from './service/ai.service';

@Module({
    imports: [ConfigModule],
    controllers: [AiController],
    providers: [AiService],
    exports: [AiService],
})
export class ChildAiModule {}