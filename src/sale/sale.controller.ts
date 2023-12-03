import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Get('/no-populate')
  findAllWithoutPopulate() {
    return this.saleService.findAllWithoutPopulate();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.saleService.findOne(id);
  }

  @Get('/no-populate/:id')
  findOneWithoutPopulate(@Param('id', ParseMongoIdPipe) id: string) {
    return this.saleService.findOneWithoutPopulate(id);
  }
}
