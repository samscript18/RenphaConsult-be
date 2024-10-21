import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Destination {
  @Prop({ required: true })
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

  @Prop({ default: 0 })
  rating: number;
}

export type DestinationDocument = HydratedDocument<Destination>;
export const DestinationSchema = SchemaFactory.createForClass(Destination);
