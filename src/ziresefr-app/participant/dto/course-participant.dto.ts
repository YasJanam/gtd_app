import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateCourseParticipantDto {
    @IsString()
    @IsNotEmpty({ message: 'آیدی کاربر نمی‌تواند خالی باشد' })
    userId: string;

    @IsString()
    @IsNotEmpty({ message: 'آیدی دوره نمی‌تواند خالی باشد' })
    courseWpId: string;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'تعداد مراحل تکمیل شده نمی‌تواند منفی باشد' })
    completed_steps?: number;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'درصد پیشرفت نمی‌تواند منفی باشد' })
    @Max(100, { message: 'درصد پیشرفت نمی‌تواند بیشتر از ۱۰۰ باشد' })
    progress_percent?: number;
}

export class UpdateCourseParticipantDto {
    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'تعداد مراحل تکمیل شده نمی‌تواند منفی باشد' })
    completed_steps?: number;

    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'درصد پیشرفت نمی‌تواند منفی باشد' })
    @Max(100, { message: 'درصد پیشرفت نمی‌تواند بیشتر از ۱۰۰ باشد' })
    progress_percent?: number;
}