import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CourseDocument = HydratedDocument<Course>;


@Schema({timestamps:true})
export class Course {

    @Prop({required:true})
    title: string

    // ========== wp ===========
    @Prop()
    wp_id : number

    @Prop()
    wp_course_url: string

    @Prop()
    description: string

    
    
    
}


export const CourseSchema = SchemaFactory.createForClass(Course);