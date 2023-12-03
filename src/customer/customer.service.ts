import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { handleErrors } from 'src/common/util';

@Injectable()
export class CustomerService {

  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      console.log('create...', { createCustomerDto });
      const customer: Customer = await this.customerModel.create(createCustomerDto);
      return customer;

    } catch (error) {
      handleErrors(error);
    }
  }

  async findAll() {
    try {
      console.log('findAll...');
      return await this.customerModel
        .find()
        .select('-__v');

    } catch (error) {
      handleErrors(error);
    }
  }

  async findOne(id: string) {
    console.log('findOne...');
    const customer: Customer = await this.customerModel.findById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with id=${id} not found`);
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer: Customer = await this.findOne(id);

    try {
      await customer.updateOne(updateCustomerDto);
      return {
        ...customer.toJSON(),
        ...updateCustomerDto
      };

    } catch (error) {
      handleErrors(error)
    }
  }

  async update2(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer: Customer = await this.customerModel.findOneAndUpdate({
        _id: id
      },
        updateCustomerDto,
        {
          new: true
        });
      console.log(customer);

      if (!customer) {
        throw new NotFoundException(`Customer with id=${id} not found`);
      }

      return customer;
    } catch (error) {
      handleErrors(error);
    }
  }

  async update3(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer: Customer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true });
      if (!customer) {
        throw new NotFoundException(`Customer with id=${id} not found`);
      }

      return customer;

    } catch (error) {
      handleErrors(error);
    }
  }

  async remove(id: string) {
    try {
      const { deletedCount } = await this.customerModel.deleteOne({ _id: id });
      if (deletedCount === 0) {
        throw new NotFoundException(`Customer with id=${id} not found`);
      }

      return;
    } catch (error) {
      handleErrors(error);
    }
  }

  async remove2(id: string) {
    try {
      const customer: Customer = await this.customerModel.findByIdAndDelete(id);

      if (!customer) {
        throw new NotFoundException(`Customer with id=${id} not found`);
      }

      return;
    } catch (error) {
      handleErrors(error);
    }
  }
}
