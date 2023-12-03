import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DocumentType extends Document {
  @Prop()
  description: string;

  @Prop({
    unique: true,
  })
  shortDescription: string;
}

export const DocumentTypeSchema = SchemaFactory.createForClass(DocumentType);
