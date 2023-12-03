import { IsNotEmpty, IsNumber, IsPositive, IsString, isNotEmpty } from "class-validator";

export class CreateSaleDetailDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  unitPrice: number;

  @IsString()
  @IsNotEmpty()
  productId: string;
}