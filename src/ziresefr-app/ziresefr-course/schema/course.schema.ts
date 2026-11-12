import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import mongoose from "mongoose";
import { Lesson } from "./lesson.schema";

export type CourseDocument = HydratedDocument<Course>;


//type Lesson

@Schema({timestamps:true})
export class Course {

    @Prop({required:true})
    title: string

    // ========== wp ===========
    @Prop()
    wp_id : number

    @Prop()
    wp_url: string

    @Prop()
    description: string

    /*@Prop({type: [String],required:false})
    lessons: string[]*/
    
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }], required: false })
    lessons: Lesson[]; 
    
}


export const CourseSchema = SchemaFactory.createForClass(Course);