import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;


@Schema({timestamps:true})
export class Product {
    @Prop()
    wp_id:number

    @Prop()
    name: string

    @Prop()
    slug: string

    @Prop()
    description: string

    @Prop()
    short_desc: string

    @Prop()
    price: number

    @Prop()
    type: string

    @Prop()
    permalink: string    

    @Prop({type: [String]})
    categories: String[]
    

    @Prop({type: [String]})
    tags: String[]

}


export const ProductSchema = SchemaFactory.createForClass(Product);