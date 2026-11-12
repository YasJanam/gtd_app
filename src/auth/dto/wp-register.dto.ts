import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class WpRegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    first_name: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    last_name: string


    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    wp_id: number
}