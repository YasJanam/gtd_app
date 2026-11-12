import { Injectable } from '@nestjs/common';
import { CreateZiresefrPostDto } from './dto/create-ziresefr-post.dto';
import { UpdateZiresefrPostDto } from './dto/update-ziresefr-post.dto';
import { Post, PostDocument } from './schema/post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class ZiresefrPostsService {
  constructor(
      @InjectModel(Post.name) private dbModel: Model<PostDocument>,
    ) {}


   async create(dto: CreateZiresefrPostDto) : Promise<Post | null> {
      const nw = new this.dbModel(dto);
      const saved = await nw.save();
      return saved;
    }
  
    async createMany(body: CreateZiresefrPostDto[]): Promise<Number> {
      const nws = await this.dbModel.insertMany(body);
      return nws.length;
    }


    async findAll(): Promise<Post[]> {
      const posts = await this.dbModel.find();
      return posts;
    }
}
