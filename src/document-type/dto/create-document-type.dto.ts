import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateDocumentTypeDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  description: string;

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  shortDescription: string;
}
