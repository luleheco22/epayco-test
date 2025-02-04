import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Wallet extends Document {
  @Prop({ required: true, unique: true })
  document: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, default: 0 })
  balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
