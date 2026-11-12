import { Injectable } from '@nestjs/common';
import { CreateRagDto } from './dto/create-rag.dto';
import { UpdateRagDto } from './dto/update-rag.dto';
import { Chunk, ChunkDocument } from './schema/chunk.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class RagService {
  constructor(
    @InjectModel(Chunk.name) private dbModel: Model<ChunkDocument>,
  ){}

 
  async findChunks() : Promise<Chunk[]> {
    const chunks = await this.dbModel.find();
    return chunks;
  }
}
