import { PartialType } from '@nestjs/swagger';
import { CreateZiresefrUserDto } from './create-ziresefr-user.dto';

export class UpdateZiresefrUserDto extends PartialType(CreateZiresefrUserDto) {}
