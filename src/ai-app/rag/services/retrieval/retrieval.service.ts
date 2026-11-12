import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chunk, ChunkDocument } from '../../schema/chunk.schema';
import { EmbeddingService } from '../embedding/embedding.service';


@Injectable()
export class RetrievalService {
    constructor(
        @InjectModel(Chunk.name) private chunkModel: Model<ChunkDocument>,
        private embeddingService: EmbeddingService,
    ) {}


    async retrieve(question: string, limit = 5) {
        const queryVector = await this.embeddingService.embed(question);

        const results = await this.chunkModel.aggregate([
            {
                $vectorSearch: {
                    index: 'vector_index',
                    path: 'embedding',
                    queryVector,
                    numCandidates: 50, 
                    limit,
                },
            },
            {
                $project: {
                    _id: 0,
                    content: 1,
                    title: 1,
                    sourceType: 1,
                    sourceId: 1,
                    score: { $meta: 'vectorSearchScore' }, 
                },
            },
        ]);

        return results;
    }
}
