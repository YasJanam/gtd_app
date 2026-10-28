import { Injectable } from '@nestjs/common';
import { CreateZiresefrProductDto } from './dto/create-ziresefr-product.dto';
import { UpdateZiresefrProductDto } from './dto/update-ziresefr-product.dto';

@Injectable()
export class ZiresefrProductsService {
  create(createZiresefrProductDto: CreateZiresefrProductDto) {
    return 'This action adds a new ziresefrProduct';
  }

  findAll() {
    return `This action returns all ziresefrProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ziresefrProduct`;
  }

  update(id: number, updateZiresefrProductDto: UpdateZiresefrProductDto) {
    return `This action updates a #${id} ziresefrProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} ziresefrProduct`;
  }
}
