import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';



export class CreateUserDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Exclude()
    password:string


    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email:string


    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    first_name:string


    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    last_name:string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    timezone:string

}