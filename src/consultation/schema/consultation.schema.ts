import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

interface ConsultationHistory {
  question: string;
  response: string;
}

@Schema({ timestamps: true })
export class Consultation {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  question: string;

  @Prop()
  response: string;

  @Prop({ default: [] })
  consultationHistory: ConsultationHistory[];
}

export type ConsultationDocument = HydratedDocument<Consultation>;
export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
