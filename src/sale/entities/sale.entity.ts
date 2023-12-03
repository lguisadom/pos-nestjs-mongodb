import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Customer } from "src/customer/entities/customer.entity";
import { Vendor } from "src/vendor/entities/vendor.entity";

@Schema()
export class Sale extends Document {
  @Prop({
    // type: Date,
    type: String,
    required: true
  })
  // date: Date;
  date: string;

  @Prop({
    type: Number,
    required: true
  })
  totalAmount: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'Customer',
  })
  customer: Customer

  @Prop({
    type: Types.ObjectId,
    ref: 'Vendor'
  })
  vendor: Vendor

  // @Prop({
  //   type: [Types.ObjectId],
  //   ref: SaleDetail.name,
  //   // required: true
  // })
  // saleDetails: SaleDetail[];
}

export const SaleSchema = SchemaFactory.createForClass(Sale);