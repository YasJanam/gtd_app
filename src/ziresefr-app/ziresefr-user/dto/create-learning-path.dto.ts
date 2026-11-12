import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested, IsUrl, IsOptional } from 'class-validator';

export class LessonDto {
    // @ApiProperty({ example: 'آموزش NestJS' })
    // @IsString()
    // title: string;

    @ApiProperty({ example: 1024 })
    @IsNumber()
    wp_id: number;

    
    // @ApiProperty({ example: 'https://ziresefr.org/courses/nestjs' })
    // @IsUrl()
    // wp_url: string;
}


export class CourseDto {
    /*@ApiProperty({ example: 'آموزش NestJS' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'توضیحات دوره' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 1024 })
    @IsNumber()
    wp_id: number;

    @ApiProperty({ example: 'https://ziresefr.org/courses/nestjs' })
    @IsUrl()
    wp_url: string;*/

    @ApiProperty({ example: 'dfrssffg' })
    @IsString()
    wp_id: number;

    @ApiProperty({ example: ['مقدمه', 'نصب'] })
    @IsArray()
    //@IsString({ each: true })
    @Type(() => LessonDto) 
    lessons: LessonDto[];
}


export class CreateLearningPathDto {
    @ApiProperty({ example: '6ab11f532a3b064e04285ed3' })
    @IsString()
    userId: string;

    @ApiProperty({ type: [CourseDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CourseDto) 
    courses: CourseDto[];
}