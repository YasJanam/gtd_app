import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    outcome?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsString()
    @IsNotEmpty()
    user: string
}