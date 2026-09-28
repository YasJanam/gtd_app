
import { IsString, IsOptional, IsEnum, IsDateString, IsMongoId } from 'class-validator';
import { GtdStatus } from '../enums/gtdStatuses.enum';


export class UpdateInboxItemDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsMongoId()
    user?: string;

    @IsOptional()
    @IsEnum(GtdStatus)
    status?: GtdStatus;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @IsOptional()
    @IsString()
    delegatedTo?: string;
}