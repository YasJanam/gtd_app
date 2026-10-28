import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Role } from '../enums/roles.enum';

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

    // ========== wp ===========
    @Prop()
    wp_id : number

    @Prop()
    wp_email: string

    @Prop()
    wp_nickname: string

    @Prop()
    wp_phone: string
    // ========================

    @Prop()
    address: string

    @Prop()
    post_code: string

    @Prop()
    city: string

    @Prop()
    country: string

    //@Prop()
    //description : string

    @Prop({type:String, enum:Object.values(Role), default:'common_user'})
    role: string

    
}


export const UserSchema = SchemaFactory.createForClass(User);