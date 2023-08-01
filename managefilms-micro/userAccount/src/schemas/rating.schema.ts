import { SchemaFactory } from '@nestjs/mongoose/dist/factories';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import mongoose, { Document, Model } from 'mongoose';

export type RatingsDocument = Ratings & Document;
export type RatingsModel = Model<RatingsDocument>;

@Schema({ versionKey: false, timestamps: true })
export class Ratings {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'films' })
  filmId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    default: 1,
  })
  rate: number;

  @Prop({ type: String, required: false })
  comment: string;
}

export const RatingsSchema = SchemaFactory.createForClass(Ratings);
