import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { handleErrors } from 'src/common/util';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './entities/sale.entity';
import { Model } from 'mongoose';
import { SaleDetail } from './entities/sale-detail.entity';
import { CustomerService } from 'src/customer/customer.service';
import { ProductService } from 'src/product/product.service';
import { VendorService } from 'src/vendor/vendor.service';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name)
    private readonly saleModel: Model<Sale>,

    @InjectModel(SaleDetail.name)
    private readonly saleDetailModel: Model<SaleDetail>,

    private readonly customerService: CustomerService,
    private readonly vendorService: VendorService,
    private readonly productService: ProductService
  ) { }

  async create(createSaleDto: CreateSaleDto) {
    try {
      console.log('create...', { createSaleDto });

      await this.checkCustomerExist(createSaleDto);

      await this.checkVendorExist(createSaleDto);

      await this.checkProductsExist(createSaleDto);

      const sale: Sale = await this.saleModel.create({
        ...createSaleDto,
        customer: createSaleDto.customerId,
        vendor: createSaleDto.vendorId
      });

      const saleDetails = createSaleDto.saleDetails.map(detailDto => ({
        ...detailDto,
        product: detailDto.productId,
        sale: sale._id
      }));

      saleDetails.forEach(async saleDetails => {
        await this.saleDetailModel.create(saleDetails);
      });

      return;

    } catch (error) {
      console.error('sale.service create error...');
      handleErrors(error);
    }
  }

  async checkCustomerExist(createSaleDto: CreateSaleDto) {
    const { customerId } = createSaleDto;
    await this.customerService.findOne(customerId);
  }

  async checkVendorExist(createSaleDto: CreateSaleDto) {
    const { vendorId } = createSaleDto;
    await this.vendorService.findOne(vendorId);
  }

  async checkProductsExist(createSaleDto: CreateSaleDto) {
    for (const saleDetail of createSaleDto.saleDetails) {
      console.log(saleDetail);
      const productId: string = saleDetail.productId.toString();
      await this.productService.findOne(productId);
    }
  }

  async findAll() {
    console.log('findAll...');
    const sales: Sale[] = await this.saleModel.find();
    const salesResponse = [];

    for (let sale of sales) {
      const saleResponse = await this.findOne(sale._id);
      salesResponse.push(saleResponse);
    }

    console.log('salesResponse...', { salesResponse });
    return salesResponse;
  }

  async findAllWithoutPopulate() {
    console.log('findAllWithoutPopulate...');
    const sales: Sale[] = await this.saleModel.find();
    const salesResponse = [];

    for (let sale of sales) {
      const saleResponse = await this.findOneWithoutPopulate(sale._id);
      salesResponse.push(saleResponse);
    }

    console.log('saleResponse...', { salesResponse });
    return salesResponse;
  }

  async findOne(id: string) {
    console.log('findOne...');
    const sale: Sale = await this.saleModel.findById(id)
      .select('-__v')
      .populate([
        { path: 'customer', select: '-__v' },
        { path: 'vendor', select: '-__v' }
      ]).exec();

    console.log('sale...', { sale });

    if (!sale) {
      throw new NotFoundException(`Sale with id=${id} not found`);
    }

    const saleDetails: SaleDetail[] = await this.saleDetailModel.find({
      sale: sale._id
    })
      .select('-__v')
      .populate({
        path: 'product',
        select: '-__v'
      })
      .exec();
    console.log('saleDetails...', { saleDetails });

    const response = {
      ...sale.toJSON(),
      details: saleDetails.map(saleDetail => ({
        ...saleDetail.toJSON(),
        product: saleDetail.product.toJSON()
      })),
    };
    console.log('response...', { response });

    return response;
  }

  async findOneWithoutPopulate(id: string) {
    console.log('findOneWithoutPopulate...');

    const sale: Sale = await this.saleModel.findById(id).select('-__v');
    console.log('sale...', { sale });

    if (!sale) {
      throw new NotFoundException(`Sale with id=${id} not found`);
    }

    const saleDetails: SaleDetail[] = await this.saleDetailModel.find(
      {
        sale: sale._id
      })

    return {
      ...sale.toJSON(),
      details: saleDetails.map(saleDetail => ({
        ...saleDetail.toJSON()
      }))
    };
  }
}
