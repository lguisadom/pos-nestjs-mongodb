import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { BadRequestCode } from 'src/common/constants';
import { handleErrors } from 'src/common/util';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ) {
  }

  async create(createProductDto: CreateProductDto) {
    try {
      console.log('create...', { createProductDto });
      const product: Product = await this.productModel.create({
        ...createProductDto,
        category: createProductDto.categoryId
      });

      return product;

    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll() {
    try {
      console.log('findAll...');
      return await this.productModel
        .find()
        .select('-__v')
    } catch (error) {
      this.handleErrors(error);
    }
  }

  // Consulta con poblado de documento referenciado: category
  async findAll2() {
    try {
      console.log('findAll...2');
      return await this.productModel
        .find()
        .select('-__v')
        .populate('category').exec();
    } catch (error) {
      this.handleErrors(error);
    }
  }

  // Consulta con poblado de documento referenciado y con campos específicos: category
  async findAll3() {
    try {
      console.log('findAll...3');
      return await this.productModel
        .find()
        .select('-__v')
        .populate({
          path: 'category',
          select: '-__v'
        }).exec();
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      const product: Product = await this.productModel.findById(id)
        .select('-__v')
        .populate({
          path: 'category',
          select: '-__v'
        }).exec();

      if (!product) {
        throw new NotFoundException(`Product with id=${id} not found`);
      }

      return product;

    } catch (error) {
      handleErrors(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    return `This action removes a #${id} product`;
  }

  handleErrors(error: any) {
    console.log(error);

    if (error.code === BadRequestCode) {
      throw new BadRequestException(error);
    }

    throw new InternalServerErrorException('Error processing category service method');
  }
}
