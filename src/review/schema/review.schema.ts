import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { DestinationDocument } from 'src/destination/schema/destination.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
export class Review {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: false,
  })
  user?: UserDocument;

  @Prop({
    type: Types.ObjectId,
    ref: 'Destination',
    required: true,
  })
  destination: DestinationDocument;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;
}

export type ReviewDocument = HydratedDocument<Review>;
export const ReviewSchema = SchemaFactory.createForClass(Review);
