import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type LessonDocument = HydratedDocument<Lesson>;


@Schema({timestamps:true})
export class Lesson {

    @Prop()
    wp_id:number
    
    @Prop()
    title: string

    @Prop()
    slug: string

    @Prop()
    content: string

    @Prop()
    excerpt: string

    @Prop()
    course_id: number

    @Prop()
    url: string

    @Prop()
    order: string
    
}


export const LessonSchema = SchemaFactory.createForClass(Lesson);