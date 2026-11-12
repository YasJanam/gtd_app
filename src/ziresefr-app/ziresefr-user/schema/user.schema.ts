import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type WpUserDocument = HydratedDocument<WpUser>;




@Schema({timestamps:true})
export class WpUser {
    @Prop()
    wp_id: number;
    
    @Prop()
    userId: string;

    @Prop()
    wp_email: string

    @Prop()
    wp_nickname: string

    @Prop()
    wp_phone: string

    /*@Prop({type: [CourseType]})
    courses: CourseType[]*/
}


export const WpUserSchema = SchemaFactory.createForClass(WpUser);