import { Module } from '@nestjs/common';
import { RagService } from './rag.service';
import { RagController } from './rag.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ChunkSchema } from './schema/chunk.schema';

import { EmbeddingService } from './services/embedding/embedding.service';
import { GenerationService } from './services/generation/generation.service';
import { IngestService } from './services/ingest/ingest.service';
import { RetrievalService } from './services/retrieval/retrieval.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chunk', schema: ChunkSchema }]) // 👈 این خط اضافه شود
  ],
  controllers: [RagController],
  providers: [
    RagService,
    EmbeddingService,
    GenerationService,
    IngestService,
    RetrievalService,
  ],
  exports: [
    IngestService,
  ]
})

export class RagModule {}
