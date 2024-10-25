import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  Destination,
  DestinationDocument,
} from 'src/destination/schema/destination.schema';

@Schema({ timestamps: true })
export class Consultation {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: Types.ObjectId, ref: Destination.name, required: true })
  destination: DestinationDocument;

  @Prop({ required: true })
  message: string;

  @Prop({
    default: 'pending',
    enum: ['pending', 'responded', 'completed', 'cancelled'],
  })
  status: string;

  @Prop()
  response: string;

  @Prop()
  respondedAt: Date;

  @Prop()
  consultationHistory: string[];
}

export type ConsultationDocument = HydratedDocument<Consultation>;
export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
