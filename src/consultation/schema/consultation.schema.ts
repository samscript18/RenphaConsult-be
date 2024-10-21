import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Consultation {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  destination: string;

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
