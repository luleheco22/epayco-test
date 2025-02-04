import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class PayDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  amount: number;
}
