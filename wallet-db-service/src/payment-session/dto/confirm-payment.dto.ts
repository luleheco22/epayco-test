import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfirmPaymentDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
