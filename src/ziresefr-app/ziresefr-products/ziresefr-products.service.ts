import { Injectable } from '@nestjs/common';
import { CreateZiresefrProductDto } from './dto/create-ziresefr-product.dto';
import { UpdateZiresefrProductDto } from './dto/update-ziresefr-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ZiresefrProductsService {
  constructor(
      @InjectModel(Product.name) private dbModel: Model<ProductDocument>,
    ) {}


    async create(dto: CreateZiresefrProductDto) : Promise<Product | null> {
      const nw = new this.dbModel(dto);
      const saved = await nw.save();
      return saved;
    }
  
    async createMany(body: CreateZiresefrProductDto[]): Promise<Number> {
      const nws = await this.dbModel.insertMany(body);
      return nws.length;
    }



    async findAll() : Promise<Product[]> {
      const products = await this.dbModel.find();
      return products
    }
}
