import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { BadRequestCode } from 'src/common/constants';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      console.log('create...', { createCategoryDto });
      const category = await this.categoryModel.create(createCategoryDto);
      return category;

    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll() {
    try {
      console.log('findAll...');
      return await this.categoryModel.find()
        .select('-__v');
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findOne(id: string) {
    console.log('findOne...');
    const category: Category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException(`Category with id=${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    console.log('update...');
    const category: Category = await this.findOne(id);
    try {
      await category.updateOne(updateCategoryDto);
      return {
        ...category.toJSON(),
        ...updateCategoryDto
      };

    } catch (error) {
      this.handleErrors(error);
    }
  }

  async update2(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category: Category = await this.categoryModel.findOneAndUpdate({
        _id: id 
      },
      updateCategoryDto,
      {
        new: true
      });
      
      if (!category) {
        throw new NotFoundException(`Category with id=${id} not found`);
      }

      return category;

    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.categoryModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new NotFoundException(`Category with id=${id} not found`);
    }

    return;
  }

  handleErrors(error: any) {
    console.log(error);

    if (error.code === BadRequestCode) {
      throw new BadRequestException(error);
    }

    throw new InternalServerErrorException('Error processing category service method');
  }
}
