import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  description: string;
}
