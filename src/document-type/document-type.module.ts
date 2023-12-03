import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentTypeService } from './document-type.service';
import { DocumentTypeController } from './document-type.controller';
import {
  DocumentType,
  DocumentTypeSchema,
} from './entities/document-type.entity';

@Module({
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentType.name,
        schema: DocumentTypeSchema,
      },
    ]),
  ],
})
export class DocumentTypeModule {}
