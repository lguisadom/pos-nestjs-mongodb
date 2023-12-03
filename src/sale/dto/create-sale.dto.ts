import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { CreateSaleDetailDto } from "./create-sale-detail.dto";

export class CreateSaleDto {
  // @IsDate()
  @IsString()
  @IsNotEmpty()
  // date: Date;
  date: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  totalAmount: number;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  customerId: string

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  vendorId: string;

  @IsNotEmpty()
  saleDetails: CreateSaleDetailDto[];
}
