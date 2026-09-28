import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { GtdStatus } from "../enums/gtdStatuses.enum";


export type InboxItemDocument = HydratedDocument<InboxItem>;


@Schema({timestamps:true})
export class InboxItem {

    @Prop({required:true})
    title: string

    @Prop({required:false})
    description: string

    @Prop({required:true,type:Types.ObjectId,ref:'User'})
    user : Types.ObjectId

    @Prop({type:String,enum:GtdStatus,default:GtdStatus.INBOX})
    status: string

    @Prop()
    dueDate: Date  //for calendar

    @Prop()
    delegatedTo: string  // for waitingForPerson  

    @Prop({required:false,type:Types.ObjectId,ref:'Project'})
    project: Types.ObjectId

    @Prop({ default:0 })
    order: number;

    @Prop()     // for next action
    estimatedMinutes : number;
    
}


export const InboxItemSchema = SchemaFactory.createForClass(InboxItem);