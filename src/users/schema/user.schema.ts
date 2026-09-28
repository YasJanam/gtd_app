import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type UserDocument = HydratedDocument<User>;


@Schema({timestamps:true})
export class User {

    @Prop({required:true,unique:true})
    username: string

    @Prop({required:true})
    password: string

    @Prop({required:false})
    first_name : string

    @Prop({required:false})
    last_name: string

    @Prop({required:false})
    email:string

    @Prop({required:false,default:'Asia/Tehran'})
    timezone:string

}


export const UserSchema = SchemaFactory.createForClass(User);