import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateVendorDto {
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
  @Length(8)
  dni: string;
}
