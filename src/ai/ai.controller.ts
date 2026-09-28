// src/ai/ai.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AiService } from './ai.service';
import { GenerateActionsDto } from './dto/generate-action.dto';

@Controller('ai')
@UseGuards(AuthGuard('jwt'))
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('generate-actions')
    async generateActions(@Body() dto: GenerateActionsDto) {
        return this.aiService.generateNextActions(dto.title, dto.description);
    }
}