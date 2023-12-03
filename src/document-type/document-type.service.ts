import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { DocumentType } from './entities/document-type.entity';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectModel(DocumentType.name)
    private readonly documentTypeModel: Model<DocumentType>,
  ) {

  }

  async create(createDocumentTypeDto: CreateDocumentTypeDto) {
    try {
      console.log('create...', { createDocumentTypeDto });
      const documentType = await this.documentTypeModel.create(createDocumentTypeDto);
      return documentType;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      console.log('findAll...');
      return await this.documentTypeModel.find()
        .select('-__v');
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    console.log('findOne...');
    const documentType: DocumentType = await this.documentTypeModel.findById(id);

    if (!documentType) {
      throw new NotFoundException(`DocumentType with id=${id} not found`);
    }

    return documentType;
  }

  async update(id: string, updateDocumentTypeDto: UpdateDocumentTypeDto) {
    const documentType: DocumentType = await this.findOne(id);
    
    try {
      await documentType.updateOne(updateDocumentTypeDto);
      return {
        ...documentType.toJSON(),
        ...updateDocumentTypeDto
      };

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.documentTypeModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new NotFoundException(`DocumentType with id=${id} not found`);
    }

    return;
  }

  handleExceptions(error: any) {
    console.error(error);

    if (error.code === 11000) {
      throw new BadRequestException(`Short description already exists in db ${JSON.stringify(error.keyValue)}`);
    }

    throw new InternalServerErrorException(`Error processing create method - check logs`);
  }
}
