import { PartialType } from '@nestjs/swagger';
import { CreateZiresefrPostDto } from './create-ziresefr-post.dto';

export class UpdateZiresefrPostDto extends PartialType(CreateZiresefrPostDto) {}
