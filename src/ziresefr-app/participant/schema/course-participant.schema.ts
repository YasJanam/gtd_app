import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import mongoose from "mongoose";

export type CourseParticipantDocument = HydratedDocument<CourseParticipant>;


//type Lesson

@Schema({timestamps:true})
export class CourseParticipant {

    @Prop({required:true})
    userId: string;

    @Prop()
    courseWpId:string;

    @Prop()
    completed_steps?: number;

    @Prop()
    progress_percent?: number
    
}


export const CourseParticipantSchema = SchemaFactory.createForClass(CourseParticipant);