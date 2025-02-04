import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentSessionService {
  findAll() {
    return `This action returns all paymentSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentSession`;
  }
}
