import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chunk, ChunkDocument } from '../../schema/chunk.schema';
import { EmbeddingService } from '../embedding/embedding.service';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

type RawDataType = {
    id: string,
    type: string,
    title: string,
    content: string,
}


@Injectable()
export class IngestService {
    constructor(
        @InjectModel(Chunk.name) private chunkModel: Model<ChunkDocument>,
        private embeddingService: EmbeddingService,
    ) {}


    async ingest(rawData: RawDataType) {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400,
            chunkOverlap: 80,
            separators: ['\n\n','\n','. ' , ', ', ' '],
        });

        const chunks = await splitter.splitText(rawData.content);

       for ( const chunkText of chunks) {
        const embedding = await this.embeddingService.embed(chunkText);

        await this.chunkModel.create({
            content: chunkText,
            embedding,
            sourceType: rawData.type,
            sourceId: rawData.id,
            title: rawData.title,
        });
       }
       return { chunks: chunks.length}
    }


    async ingestMany(rawDatas: RawDataType[]) {
       for ( const rd of rawDatas) {
        await this.ingest(rd)
       }
    }
}
