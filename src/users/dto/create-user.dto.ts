import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, IsEnum, } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../enums/roles.enum';


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
    first_name?:string


    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    last_name?:string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    timezone?:string


    @ApiProperty({ description: 'آدرس کاربر', required: false })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({ description: 'کد پستی', required: false })
    @IsString()
    @IsOptional()
    post_code?: string;

    @ApiProperty({ description: 'شهر', required: false })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({ description: 'کشور', required: false })
    @IsString()
    @IsOptional()
    country?: string;

    @ApiProperty({ 
        description: 'نقش کاربر', 
        enum: Role, 
        default: Role.COMMON_USER, 
        required: false 
    })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;

    @ApiProperty({ description: 'هدف اصلی کاربر', required: false })
    @IsString()
    @IsOptional()
    mainGoal?: string;

    @ApiProperty({ description: 'درباره من', required: false })
    @IsString()
    @IsOptional()
    aboutMe?: string;

    @ApiProperty({ description: 'شغل کاربر', required: false })
    @IsString()
    @IsOptional()
    job?: string;


    @ApiProperty({ description: 'wp_id', required: false })
    @IsNumber()
    @IsOptional()
    wp_id?: number;


    /*@ApiProperty({ description: 'wp username', required: false })
    @IsString()
    @IsOptional()
    wp_username?: string;*/


    /*@ApiProperty({ description: 'wp_email', required: false })
    @IsString()
    @IsOptional()
    wp_email?: string;*/

}