import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { Sale } from "./sale.entity";

@Schema()
export class SaleDetail extends Document {
  @Prop({
    type: Number,
    required: true
  })
  quantity: number;

  @Prop({
    type: Number,
    required: true
  })
  unitPrice: number;

  @Prop({
    type: Types.ObjectId,
    ref: Product.name
  })
  product: Product;

  @Prop({
    type: Types.ObjectId,
    ref: Sale.name
  })
  sale: Sale;
}

export const SaleDetailSchema = SchemaFactory.createForClass(SaleDetail);
