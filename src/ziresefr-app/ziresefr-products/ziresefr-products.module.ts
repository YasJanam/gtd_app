import { Module } from '@nestjs/common';
import { ZiresefrProductsService } from './ziresefr-products.service';
import { ZiresefrProductsController } from './ziresefr-products.controller';

@Module({
  controllers: [ZiresefrProductsController],
  providers: [ZiresefrProductsService],
})
export class ZiresefrProductsModule {}
