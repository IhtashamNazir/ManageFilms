import { SchemaFactory } from '@nestjs/mongoose/dist/factories';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import { Document, Model } from 'mongoose';

export type FilmsDocument = Films & Document;
export type FilmsModel = Model<FilmsDocument>;

@Schema({ versionKey: false, timestamps: true })
export class Films {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Date, required: true })
  releaseDate: Date;

  @Prop({
    type: String,
    required: false,
  })
  country: string;

  @Prop({
    type: String,
    required: false,
  })
  genre: string;

  @Prop({
    type: String,
    required: false,
  })
  photo: string;
}

export const FilmsSchema = SchemaFactory.createForClass(Films);
