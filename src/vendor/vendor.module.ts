import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from './entities/vendor.entity';

@Module({
  controllers: [VendorController],
  providers: [VendorService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Vendor.name,
        schema: VendorSchema
      }
    ])
  ],
  exports: [VendorService]
})
export class VendorModule { }
