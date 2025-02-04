import {
  Injectable,
  ConflictException,
  Logger,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schema/customer.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    private jwtService: JwtService,
    private readonly walletsService: WalletsService,
  ) {}

  async registerCustomer(createCustomerDto: CreateCustomerDto): Promise<any> {
    const existingByDocument = await this.findCustomerByDocument(
      createCustomerDto.document,
    );
    const existingByEmail = await this.findCustomerByEmail(
      createCustomerDto.email,
    );

    if (existingByDocument) {
      throw new ConflictException('The document is already registered');
    }

    if (existingByEmail) {
      throw new ConflictException('The email is already registered');
    }

    try {
      const { password, ...customerData } = createCustomerDto;
      const hashedPassword = bcrypt.hashSync(password, 10);

      const customer = new this.customerModel({
        ...customerData,
        password: hashedPassword,
      });

      const savedCustomer = await customer.save();

      // **Crear la wallet después de crear el cliente**
      try {
        await this.walletsService.createWallet({
          document: savedCustomer.document,
          phone: savedCustomer.phone,
        });
      } catch (walletError) {
        this.logger.error(`Error creating wallet: ${walletError.message}`);
        throw new InternalServerErrorException(
          'Error creating wallet',
          walletError.message,
        );
      }

      const token = this.getJwtToken({
        name: savedCustomer.name,
        id: savedCustomer._id.toString(),
        email: savedCustomer.email,
      });

      return {
        ...savedCustomer.toObject(),
        token,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        'Error creating customer',
        error.message,
      );
    }
  }

  async login(loginCustomerDto: LoginCustomerDto) {
    const { email } = loginCustomerDto;

    const customer = await this.findCustomerByEmail(email);

    if (!customer) {
      throw new UnauthorizedException('Incorrect email ');
    }

    if (!bcrypt.compareSync(loginCustomerDto.password, customer?.password)) {
      throw new UnauthorizedException('Incorrect password');
    }

    return {
      customer: {
        document: customer.document,
        email: customer.email,
        phone: customer.phone,
        name: customer.name,
      },
      token: this.getJwtToken({
        name: customer.name,
        id: customer._id.toString(),
        email: customer.email,
      }),
    };
  }

  async findCustomerByDocument(
    document: string,
  ): Promise<CustomerDocument | null> {
    return this.customerModel.findOne({ document }).exec();
  }

  async findCustomerByEmail(email: string): Promise<CustomerDocument | null> {
    return this.customerModel.findOne({ email }).select('+password').exec();
  }

  private getJwtToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
