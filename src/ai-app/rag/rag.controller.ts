import { Controller, Get, Post, Body, } from '@nestjs/common';

import { IngestService } from './services/ingest/ingest.service';
import { GenerationService } from './services/generation/generation.service';
import { RagService } from './rag.service';

@Controller('rag')
export class RagController {
  constructor(
    private readonly ingestService: IngestService,
    private readonly generationService: GenerationService,
    private readonly ragService : RagService,
  ) {}

  @Post('ingest')
  async ingest(@Body() body: {id:string, type:string, title:string, content:string}) {
    return this.ingestService.ingest(body);
  }

  @Post('ask')
  async ask(@Body() body: {question: string}) {
    return { answer: await this.generationService.answer(body.question)};
  }

  @Get('chunks')
  async findChunks() {
    return this.ragService.findChunks();
  }

}
