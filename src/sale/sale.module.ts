import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './entities/sale.entity';
import { SaleDetail, SaleDetailSchema } from './entities/sale-detail.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';
import { VendorModule } from 'src/vendor/vendor.module';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Sale.name,
        schema: SaleSchema
      },
      {
        name: SaleDetail.name,
        schema: SaleDetailSchema
      }
    ]),
    CustomerModule,
    VendorModule,
    ProductModule,
  ]
})
export class SaleModule { }
