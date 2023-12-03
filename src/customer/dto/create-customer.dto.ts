import { IsEmail, IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  dni: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phoneNumber: string;
}
