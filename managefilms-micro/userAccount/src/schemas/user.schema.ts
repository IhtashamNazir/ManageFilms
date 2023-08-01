import { SchemaFactory } from '@nestjs/mongoose/dist/factories';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import { Document, Model } from 'mongoose';

export type UsersDocument = Users & Document;
export interface UsersModel extends Model<UsersDocument> {
  paginate(
    query: any,
    pipeline: any[],
    options: { page?: number; limit?: number },
  ): Promise<{ result: any[]; meta: any }>;
}
@Schema({ versionKey: false, timestamps: true })
export class Users {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: Boolean, required: true, default: false })
  isDeleted: boolean;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: String, required: true })
  passwordSalt: string;

  @Prop({ type: String, required: true })
  passwordRound: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

//Extra Functions

UsersSchema.statics.paginate = async function (
  query: any,
  pipeline: any[],
  options: { page?: number; limit?: number },
): Promise<{ result: any[]; meta: any }> {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  const results = await this.aggregate([
    { $match: query },
    ...pipeline,
    {
      $facet: {
        result: [{ $skip: skip }, { $limit: limit }],
        metadata: [
          { $count: 'total' },
          {
            $addFields: {
              page,
              limit,
              totalPages: {
                $ceil: { $divide: ['$total', limit] },
              },
            },
          },
        ],
      },
    },
    { $unwind: '$metadata' },
  ]);

  return (
    results[0] ?? {
      results: [],
      metaData: {
        total: 0,
        page,
        limit,
        totalPages: 1,
      },
    }
  );
};
