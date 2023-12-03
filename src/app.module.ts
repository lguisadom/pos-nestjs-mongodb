import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DocumentTypeModule } from './document-type/document-type.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { VendorModule } from './vendor/vendor.module';
import { SaleModule } from './sale/sale.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      dbName: process.env.MONGODB_DBNAME,
    }),
    DocumentTypeModule,
    CategoryModule,
    ProductModule,
    CustomerModule,
    VendorModule,
    SaleModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
