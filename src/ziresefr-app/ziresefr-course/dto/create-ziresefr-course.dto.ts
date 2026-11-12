import { IsNumber, IsString } from "class-validator";

export class CreateZiresefrCourseDto {

    @IsString()
    title:string;

    @IsString()
    wp_url: string

    @IsNumber()
    wp_id: number;

    @IsString()
    description: string;
}
