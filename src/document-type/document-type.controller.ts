import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('document-type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post()
  create(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    console.log({ createDocumentTypeDto });
    return this.documentTypeService.create(createDocumentTypeDto);
  }

  @Get()
  findAll() {
    return this.documentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.documentTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateDocumentTypeDto: UpdateDocumentTypeDto) {
    return this.documentTypeService.update(id, updateDocumentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.documentTypeService.remove(id);
  }
}
