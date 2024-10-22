import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Review, ReviewSchema } from './review.schema';

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

  @Prop({ type: [ReviewSchema], default: [] })
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
