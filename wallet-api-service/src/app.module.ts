import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WalletController } from './wallet/wallet.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [WalletController],
})
export class AppModule {}
