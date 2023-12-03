import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Customer extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address: string;

  @Prop({
    unique: true,
    index: true
  })
  dni: string;

  @Prop({
    unique: true
  })
  email: string;

  @Prop()
  phoneNumber: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);