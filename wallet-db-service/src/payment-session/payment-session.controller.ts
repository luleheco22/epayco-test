import { Controller, Get, Param, Delete } from '@nestjs/common';
import { PaymentSessionService } from './payment-session.service';

@Controller('payment-session')
export class PaymentSessionController {
  constructor(private readonly paymentSessionService: PaymentSessionService) {}

  @Get()
  findAll() {
    return this.paymentSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentSessionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentSessionService.remove(+id);
  }
}
