// src/ai/dto/generate-actions.dto.ts
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class GenerateActionsDto {
    @IsString()
    @IsNotEmpty({ message: 'عنوان پروژه الزامی است' })
    @MaxLength(200)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(2000)
    description?: string;
}