import { Controller, Post, Body } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('register')
  async register(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.registerCustomer(createCustomerDto);
  }

  @Post('login')
  loginUser(@Body() loginCustomerDto: LoginCustomerDto) {
    return this.customersService.login(loginCustomerDto);
  }
}
