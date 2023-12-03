import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Category } from "src/category/entities/category.entity";

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  // @Prop({
  //   type: Types.ObjectId,
  //   ref: 'Category'
  // })
  // category: Category;
  @Prop({
    type: Types.ObjectId,
    ref: 'Category'
  })
  category: Category;

  // @Prop()
  // categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);