import { Module } from '@nestjs/common';
import { ZiresefrProductsService } from './ziresefr-products.service';
import { ZiresefrProductsController } from './ziresefr-products.controller';
import { ProductSchema } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]) 
  ],
  controllers: [ZiresefrProductsController],
  providers: [ZiresefrProductsService],
})
export class ZiresefrProductsModule {}
