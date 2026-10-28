import { PartialType } from '@nestjs/swagger';
import { CreateZiresefrConnectionDto } from './create-ziresefr_connection.dto';

export class UpdateZiresefrConnectionDto extends PartialType(CreateZiresefrConnectionDto) {}
