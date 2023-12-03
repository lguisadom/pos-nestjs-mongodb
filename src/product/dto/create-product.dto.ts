import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
