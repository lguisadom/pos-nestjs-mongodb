import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { BadRequestCode } from "./constants";

export const handleErrors = (error: any) => {
  console.log('handling errors');
  console.error(error);
  
  if (error.code === BadRequestCode) {
    throw new BadRequestException(error);
  }

  if (error instanceof NotFoundException) {
    throw error;
  }

  throw new InternalServerErrorException('Error processing category service method');
}