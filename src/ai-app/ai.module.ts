import { Module } from '@nestjs/common';
import { ChildAiModule } from './ai/ai.module';
import { RagModule } from './rag/rag.module';


@Module({
  imports: [
    ChildAiModule,
    RagModule,
  ],
})

export class AiModule {}