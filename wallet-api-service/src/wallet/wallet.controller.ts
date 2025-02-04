import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Logger,
  HttpException,
  Req,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errorCode?: number;
}

@Controller('wallet')
export class WalletController {
  private readonly logger = new Logger(WalletController.name);
  constructor(private readonly httpService: HttpService) {}

  private baseUrl = process.env.WALLET_SERVICE_DB_URL;

  @Post('register-customer')
  async registerUser(@Body() body) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseUrl}/api/v1/customers/register`,
          body,
        ),
      );
      return this.handleSuccessResponse(response.data);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  @Post('login-customer')
  async login(@Body() body) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/api/v1/customers/login`, body),
      );
      return this.handleSuccessResponse(response.data);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  @Post('create-wallet')
  async createWallet(@Body() body, @Req() req) {
    try {
      const token = this.extractToken(req);

      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/api/v1/wallets/create`, body, {
          headers: {
            Authorization: token,
          },
        }),
      );

      return this.handleSuccessResponse(response.data);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  @Post('recharge-wallet')
  async rechargeWallet(@Body() body, @Req() req) {
    try {
      const token = this.extractToken(req);

      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/api/v1/wallets/recharge`, body, {
          headers: {
            Authorization: token,
          },
        }),
      );
      return this.handleSuccessResponse(response.data);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  @Post('pay')
  async Pay(@Body() body, @Req() req) {
    try {
      const token = this.extractToken(req);

      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/api/v1/wallets/pay`, body, {
          headers: {
            Authorization: token,
          },
        }),
      );
      return this.handleSuccessResponse(response.data);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  @Post('confirm-payment')
  async confirmPayment(@Body() body, @Req() req) {
    try {
      const token = this.extractToken(req);

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseUrl}/api/v1/wallets/confirm-payment`,
          body,
          {
            headers: {
              Authorization: token,
            },
          },
        ),
      );
      return this.handleSuccessResponse(response.data);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  @Get('balance/:document/:phone')
  async getBalance(
    @Param('document') document: string,
    @Param('phone') phone: string,
    @Req() req,
  ) {
    try {
      const token = this.extractToken(req);

      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/api/v1/wallets/balance/${document}/${phone}`,
          {
            headers: {
              Authorization: token,
            },
          },
        ),
      );
      return this.handleSuccessResponse(response.data);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any): never {
    if (error.response) {
      this.logger.error(
        `Error response from DB service: ${error.response.data.message}`,
      );
      throw new HttpException(
        {
          success: false,
          message: error.response.data.message,
        },
        error.response.status,
      );
    } else {
      this.logger.error(`Unexpected error: ${error.message}`);
      throw new HttpException(
        { success: false, message: 'Unexpected error occurred' },
        500,
      );
    }
  }

  private handleSuccessResponse<T>(data: T): ApiResponse<T> {
    return { success: true, data };
  }

  private extractToken(req): string {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('No authorization token found in headers');
    }
    return token;
  }
}
