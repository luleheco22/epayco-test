import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { WalletsModule } from './wallets/wallets.module';
import { PaymentSessionModule } from './payment-session/payment-session.module';
import { MailModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CustomersModule,
    WalletsModule,
    PaymentSessionModule,
    MailModule,
  ],
})
export class AppModule {}
