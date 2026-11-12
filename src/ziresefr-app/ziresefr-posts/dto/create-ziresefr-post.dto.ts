import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, IsUrl } from 'class-validator';

export class CreateZiresefrPostDto {
  @ApiProperty({ description: 'شناسه پست در وردپرس', example: 1234 })
  @IsNumber()
  wp_id: number;

  @ApiProperty({ description: 'عنوان پست', example: 'آموزش کامل NestJS' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'نامک (slug) پست', example: 'learn-nestjs' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'محتوای کامل پست' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'خلاصه پست' })
  @IsString()
  excerpt: string;

  @ApiProperty({ description: 'نام نویسنده', example: 'علی رضایی' })
  @IsString()
  author_name: string;

  @ApiProperty({ description: 'شناسه نویسنده در وردپرس', example: 5 })
  @IsNumber()
  author_wp_id: number;

  @ApiProperty({ 
    description: 'آرایه‌ای از دسته‌بندی‌ها', 
    example: ['برنامه نویسی', 'وب'],
    required: false 
  })
  @IsArray()
  @IsString({ each: true }) 
  @IsOptional()
  categories?: string[];

  @ApiProperty({ description: 'لینک مستقیم به پست در وردپرس', example: 'https://ziresefr.org/blog/nestjs' })
  @IsString()
  @IsOptional() 
  wp_url?: string;
}