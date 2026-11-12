import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LearningPathDocument = HydratedDocument<LearningPath>;

Schema({ _id: false }) 
export class LessonType {
    @Prop()
    wp_id: number;


    @Prop({ required: true })
    title: string;

    @Prop()
    wp_url: string;
}


@Schema({ _id: false }) 
export class CourseType {
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    wp_id: number;

    @Prop({ required: true })
    wp_url?: string;

    @Prop({ type: [LessonType], default: [] }) 
    lessons: LessonType[];
}



@Schema({ timestamps: true })
export class LearningPath {
    @Prop({ required: true })
    userId: string;

    
    @Prop({ type: [CourseType], default: [] })
    courses: CourseType[];
}

export const LearningPathSchema = SchemaFactory.createForClass(LearningPath);