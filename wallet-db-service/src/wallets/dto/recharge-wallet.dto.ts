import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class RechargeWalletDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  balance: number;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
