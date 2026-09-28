import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";



export type ProjectDocument = HydratedDocument<Project>;


@Schema({timestamps:true})
export class Project {

    @Prop({required:true})
    name: string

    @Prop({required:false})
    outcome: string

    @Prop({required:true,type:Types.ObjectId,ref:'User'})
    user : Types.ObjectId

    @Prop({})
    notes: string 

}


export const Projectchema = SchemaFactory.createForClass(Project);