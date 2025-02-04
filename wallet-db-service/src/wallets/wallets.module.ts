import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { Wallet, WalletSchema } from './schema/wallet.schema';
import { Customer, CustomerSchema } from 'src/customer/schema/customer.schema';
import {
  PaymentSession,
  PaymentSessionSchema,
} from 'src/payment-session/schema/payment-session.schema';
import { CustomersModule } from 'src/customer/customer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    MongooseModule.forFeature([
      { name: PaymentSession.name, schema: PaymentSessionSchema },
    ]),
    forwardRef(() => CustomersModule),
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
  exports: [WalletsService],
})
export class WalletsModule {}
