import { SchemaFactory } from '@nestjs/mongoose/dist/factories';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import { Document, Model } from 'mongoose';

export type TokensDocument = Tokens & Document;
export type TokensModel = Model<TokensDocument>;

@Schema({ versionKey: false, timestamps: true })
export class Tokens {
  @Prop({ type: String, required: true })
  token: string;

  @Prop({ type: String, required: true })
  data: string;

  @Prop({ type: Date })
  expiration: Date;

  @Prop({
    type: String,
    required: true,
    enum: ['refresh_token', 'access_token'],
  })
  tokenType: string;
}

export const TokensSchema = SchemaFactory.createForClass(Tokens);
