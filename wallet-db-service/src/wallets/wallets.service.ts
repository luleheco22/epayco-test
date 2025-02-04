import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schema/wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Customer } from 'src/customer/schema/customer.schema';
import { PaymentSession } from 'src/payment-session/schema/payment-session.schema';
import * as crypto from 'crypto';
import { PayDto } from 'src/payment-session/dto/create-payment-session.dto';
import { ConfirmPaymentDto } from 'src/payment-session/dto/confirm-payment.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(PaymentSession.name)
    private paymentSessionModel: Model<PaymentSession>,
    private mailerService: MailerService,
  ) {}

  async createWallet(data: CreateWalletDto): Promise<Wallet> {
    const customer = await this.customerModel
      .findOne({ document: data.document, phone: data.phone })
      .exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const existingWallet = await this.walletModel
      .findOne({ document: data.document })
      .exec();
    if (existingWallet) {
      throw new BadRequestException(
        'The wallet already exists for this client',
      );
    }

    return (await this.walletModel.create({ ...data, balance: 0 })).toJSON();
  }

  async getBalance(document: string, phone: string): Promise<number> {
    const wallet = await this.walletModel.findOne({ document, phone }).exec();

    if (!wallet) {
      throw new NotFoundException(
        'A wallet associated with this document and phone was not found.',
      );
    }

    return wallet.balance;
  }

  async rechargeWallet(
    data: RechargeWalletDto,
  ): Promise<{ message: string; balance: number }> {
    const wallet = await this.walletModel
      .findOne({ document: data.document, phone: data.phone })
      .exec();

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    // Actualizar saldo
    wallet.balance += data.balance;
    await wallet.save();

    return {
      message: 'Wallet recharged successfully',
      balance: wallet.balance,
    };
  }

  async pay(data: PayDto): Promise<{ message: string; sessionId: string }> {
    const wallet = await this.walletModel
      .findOne({ document: data.document })
      .exec();
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (wallet.balance < data.amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const token = crypto.randomInt(100000, 999999).toString();
    const sessionId = crypto.randomUUID();

    await this.paymentSessionModel.create({
      sessionId,
      document: data.document,
      token,
      amount: data.amount,
    });

    const customer = await this.customerModel
      .findOne({ document: data.document })
      .exec();
    if (!customer || !customer.email) {
      throw new NotFoundException('Customer email not found');
    }

    const frontendUrl = `${process.env.FRONT_URL}/confirm-payment?token=${token}&sessionId=${sessionId}&amount=${data.amount}`;

    await this.mailerService.sendMail({
      to: customer.email,
      subject: 'Payment Confirmation Token',
      html: `
        <html>
          <body>
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
              <h2 style="color: #4CAF50;">Payment Confirmation</h2>
              <p>Hello ${customer.name},</p>
              <p>Your payment is almost complete. To confirm your payment, please use the following token:</p>
              <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">Token: ${token}</p>
              <p>Amount: ${data.amount} USD</p>
              <p>Click the link below to complete your payment:</p>
              <a href="${frontendUrl}" style="color: #ffffff; background-color: #4CAF50; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Complete Payment</a>
              <p>If you did not request this payment, please ignore this email.</p>
              <footer style="margin-top: 20px; font-size: 12px; color: #888888;">
                <p>Thank you for using our service!</p>
                <p>Luis Leonel</p>
              </footer>
            </div>
          </body>
        </html>
      `,
    });

    return { message: 'Token sent to registered email', sessionId };
  }

  async confirmPayment(data: ConfirmPaymentDto): Promise<{ message: string }> {
    const session = await this.paymentSessionModel
      .findOne({ sessionId: data.sessionId })
      .exec();

    if (!session) {
      throw new NotFoundException('Invalid session ID');
    }

    if (session.token !== data.token) {
      throw new BadRequestException('Invalid token');
    }

    const wallet = await this.walletModel
      .findOne({ document: session.document })
      .exec();
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (wallet.balance < session.amount) {
      throw new BadRequestException('Insufficient balance');
    }

    wallet.balance -= data.amount;
    await wallet.save();

    await this.paymentSessionModel.deleteOne({ sessionId: data.sessionId });

    return { message: 'Payment successfully confirmed' };
  }
}
