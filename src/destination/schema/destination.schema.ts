import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Review } from 'src/review/schema/review.schema';

@Schema({ timestamps: true })
export class Destination {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  mainImage: string;

  @Prop({ type: [String] })
  gallery: string[];

  @Prop({ required: true })
  budget: number;

  @Prop({ required: true })
  location: string;

  @Prop({ type: [Types.ObjectId], ref: Review.name })
  reviews: Review[];

  @Prop({ default: 0 })
  totalReviews: number;

  @Prop({ default: 0 })
  totalRatings: number;

  @Prop({ default: 0 })
  averageRating: number;
}

export type DestinationDocument = HydratedDocument<Destination>;
export const DestinationSchema = SchemaFactory.createForClass(Destination);
