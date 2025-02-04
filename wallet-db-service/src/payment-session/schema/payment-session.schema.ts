import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, expires: '2m' })
export class PaymentSession extends Document {
  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  document: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true, default: 0 })
  amount: number;
}

export const PaymentSessionSchema =
  SchemaFactory.createForClass(PaymentSession);
