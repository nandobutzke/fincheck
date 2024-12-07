import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateBalanceBankAccountDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
