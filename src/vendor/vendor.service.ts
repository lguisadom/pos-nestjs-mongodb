import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vendor } from './entities/vendor.entity';
import { Model } from 'mongoose';
import { handleErrors } from 'src/common/util';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel(Vendor.name)
    private readonly vendorModel: Model<Vendor>
  ) { }

  async create(createVendorDto: CreateVendorDto) {
    try {
      console.log('create...', { createVendorDto });
      const vendor: Vendor = await this.vendorModel.create(createVendorDto);
      return vendor;

    } catch (error) {
      handleErrors(error);
    }
  }

  async findAll() {
    console.log('findAll...');
    return this.vendorModel.find()
      .select('-__v');
  }

  async findOne(id: string) {
    try {
      console.log('findOne...');
      const vendor: Vendor = await this.vendorModel.findById(id).select('-__v');

      if (!vendor) {
        throw new NotFoundException(`vendor with id=${id} not found`);
      }

      return vendor;
    } catch (error) {
      handleErrors(error);
    }
  }

  async findOne2(id: string) {
    try {
      console.log('findOne2...');
      const vendor: Vendor = await this.vendorModel.findOne({ _id: id }).select('-__v');

      if (!vendor) {
        throw new NotFoundException(`vendor with id=${id} not found`);
      }

      return vendor;
    } catch (error) {
      handleErrors(error);
    }
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    try {
      console.log('update...', { id, updateVendorDto });
      const vendor: Vendor = await this.findOne(id);

      await vendor.updateOne(updateVendorDto);

      return {
        ...vendor.toJSON(),
        ...updateVendorDto,
      };

    } catch (error) {
      handleErrors(error);
    }
  }

  async update2(id: string, updateVendorDto: UpdateVendorDto) {
    try {
      console.log('update2...', { id, updateVendorDto });

      const updatedVendor: Vendor = await this.vendorModel.findByIdAndUpdate(
        id,
        updateVendorDto,
        {
          new: true
        }
      ).select('-__v');

      if (!updatedVendor) {
        throw new NotFoundException(`Vendor with id=${id} not found`);
      }

      return updatedVendor;

    } catch (error) {
      handleErrors(error);
    }
  }

  async update3(id: string, updateVendorDto: UpdateVendorDto) {
    try {
      console.log('update3...', { id, updateVendorDto });
      const updatedVendor: Vendor = await this.vendorModel.findOneAndUpdate(
        {
          _id: id
        },
        updateVendorDto,
        {
          new: true
        })
        .select('-__v');

      if (!updatedVendor) {
        throw new NotFoundException(`Vendor with id=${id} not found`);
      }

      return updatedVendor;

    } catch (error) {
      handleErrors(error);
    }
  }

  async remove(id: string) {
    try {
      console.log('remove...', id);
      const vendor: Vendor = await this.vendorModel.findOneAndDelete({ _id: id });
      
      if (!vendor) {
        throw new NotFoundException(`vendor with id=${id} not found`);
      }

      return;

    } catch (error) {
      handleErrors(error);
    }
  }

  async remove2(id: string) {
    try {
      console.log('remove2...', id);
      const vendor: Vendor = await this.vendorModel.findByIdAndDelete(id);

      if (!vendor) {
        throw new NotFoundException(`Vendor with id=${id} not found`);
      }

      return;

    } catch (error) {
      handleErrors(error);
    }
  }

  async remove3(id: string) {
    try {
      console.log('remove3...', id);
      const { deletedCount } = await this.vendorModel.deleteOne({ _id: id });

      if (deletedCount === 0) {
        throw new NotFoundException(`Vendor with id=${id} not found`);
      }

      return;

    } catch (error) {
      handleErrors(error);
    }
  }
}
