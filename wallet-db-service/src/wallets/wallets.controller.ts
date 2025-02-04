import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { PayDto } from 'src/payment-session/dto/create-payment-session.dto';
import { ConfirmPaymentDto } from 'src/payment-session/dto/confirm-payment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.createWallet(createWalletDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('balance/:document/:phone')
  async getBalance(
    @Param('document') document: string,
    @Param('phone') phone: string,
  ) {
    return { balance: await this.walletsService.getBalance(document, phone) };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('recharge')
  async rechargeWallet(@Body() rechargeWalletDto: RechargeWalletDto) {
    return await this.walletsService.rechargeWallet(rechargeWalletDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('pay')
  async pay(@Body() payDto: PayDto) {
    return await this.walletsService.pay(payDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('confirm-payment')
  async confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return await this.walletsService.confirmPayment(confirmPaymentDto);
  }
}
