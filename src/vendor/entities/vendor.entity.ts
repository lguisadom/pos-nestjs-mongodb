import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Vendor extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    unique: true,
    index: true
  })
  dni: string;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
