import { IsNotEmpty, IsString } from 'class-validator';

export class LoginCustomerDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
