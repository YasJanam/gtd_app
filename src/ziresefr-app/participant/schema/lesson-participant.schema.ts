import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import mongoose from "mongoose";

export type LessonParticipantDocument = HydratedDocument<LessonParticipant>;


//type Lesson

@Schema({timestamps:true})
export class LessonParticipant {

    @Prop({required:true})
    userId: string;

    @Prop()
    lessonId:string;

    @Prop()
    completed?: boolean;

    @Prop()
    progress_percent?: number
}


export const LessonParticipantSchema = SchemaFactory.createForClass(LessonParticipant);