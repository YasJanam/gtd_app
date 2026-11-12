import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class CreateLessonParticipantDto {
    @IsString()
    @IsNotEmpty({ message: 'آیدی کاربر نمی‌تواند خالی باشد' })
    userId: string;

    @IsString()
    @IsNotEmpty({ message: 'آیدی درس نمی‌تواند خالی باشد' })
    lessonId: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'درصد پیشرفت نمی‌تواند منفی باشد' })
    @Max(100, { message: 'درصد پیشرفت نمی‌تواند بیشتر از ۱۰۰ باشد' })
    progress_percent?: number;
}

export class UpdateLessonParticipantDto {
    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'درصد پیشرفت نمی‌تواند منفی باشد' })
    @Max(100, { message: 'درصد پیشرفت نمی‌تواند بیشتر از ۱۰۰ باشد' })
    progress_percent?: number;
}