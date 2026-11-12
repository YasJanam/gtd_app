import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, IsUrl } from 'class-validator';

export class CreateZiresefrProductDto {
  @ApiProperty({ description: 'شناسه محصول در وردپرس', example: 1024 })
  @IsNumber()
  wp_id: number;

  @ApiProperty({ description: 'نام محصول', example: 'دوره آموزشی NestJS' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'نامک (slug) محصول', example: 'nestjs-course' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'توضیحات کامل', required: false })
  @IsString()
  @IsOptional() 
  description?: string;

  @ApiProperty({ description: 'توضیحات کوتاه', required: false })
  @IsString()
  @IsOptional()
  short_desc?: string;

  @ApiProperty({ description: 'قیمت محصول', example: 450000 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'نوع محصول', example: 'simple' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'لینک مستقیم به محصول', required: false })
  @IsString()
  @IsOptional()
  wp_url?: string;

  @ApiProperty({ description: 'آرایه‌ای از دسته‌بندی‌ها', example: ['برنامه نویسی', 'وب'], required: false })
  @IsArray()
  @IsString({ each: true }) 
  @IsOptional()
  categories?: string[];

  @ApiProperty({ description: 'آرایه‌ای از برچسب‌ها', example: ['NestJS', 'Node.js'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

}