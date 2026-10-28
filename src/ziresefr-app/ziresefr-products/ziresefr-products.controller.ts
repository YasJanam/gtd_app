import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZiresefrProductsService } from './ziresefr-products.service';
import { CreateZiresefrProductDto } from './dto/create-ziresefr-product.dto';
import { UpdateZiresefrProductDto } from './dto/update-ziresefr-product.dto';

@Controller('ziresefr-products')
export class ZiresefrProductsController {
  constructor(private readonly ziresefrProductsService: ZiresefrProductsService) {}

  @Post()
  create(@Body() createZiresefrProductDto: CreateZiresefrProductDto) {
    return this.ziresefrProductsService.create(createZiresefrProductDto);
  }

  @Get()
  findAll() {
    return this.ziresefrProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ziresefrProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZiresefrProductDto: UpdateZiresefrProductDto) {
    return this.ziresefrProductsService.update(+id, updateZiresefrProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ziresefrProductsService.remove(+id);
  }
}
