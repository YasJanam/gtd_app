import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChunkDocument = Chunk & Document;

@Schema()
export class Chunk {
    @Prop({ required: true })
    content: string;


    @Prop({ type: [Number], required: true})
    embedding: number[];


    @Prop()
    sourceType?: string;

    @Prop()
    sourceId?: string;


    @Prop()
    title?: string;
}


export const ChunkSchema = SchemaFactory.createForClass(Chunk);


/*ChunkSchema.index(
    { embedding: 'vectorSearch'},
    {
        name: 'vector_index',
        dimension: 1536,
        similarity: 'cosine',
    },
);*/