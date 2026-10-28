import { PartialType } from '@nestjs/swagger';
import { CreateZiresefrProductDto } from './create-ziresefr-product.dto';

export class UpdateZiresefrProductDto extends PartialType(CreateZiresefrProductDto) {}
