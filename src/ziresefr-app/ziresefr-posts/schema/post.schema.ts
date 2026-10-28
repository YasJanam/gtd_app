import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PostDocument = HydratedDocument<Post>;


@Schema({timestamps:true})
export class Post {
    @Prop()
    wp_id:number

    @Prop()
    title: string

    @Prop()
    slug: string

    @Prop()
    content: string

    @Prop()
    excerpt: string

    @Prop()
    author_name: string

    @Prop()
    author_wp_id: number

    @Prop({type:[String]})
    categories : string[]
    

    @Prop()
    wp_page_url: string
}


export const PostSchema = SchemaFactory.createForClass(Post);