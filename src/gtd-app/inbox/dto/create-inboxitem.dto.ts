import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, IsDate, } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateInboxItemDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    user : string

    @IsOptional()
    @IsNumber()
    order: number

    @IsOptional()
    @IsNumber()
    estimatedMinutes: number

    @IsOptional()
    @IsString()
    status?:string

    @IsOptional()
    @IsDate()
    dueDate?: Date


    /*@IsOptional()
    @IsString()
    project: string*/
    
}
