import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Consultation, ConsultationSchema } from './schema/consultation.schema';
import { AIModule } from 'src/ai/ai.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Consultation.name,
        schema: ConsultationSchema,
      },
    ]),
    AIModule,
  ],
  controllers: [ConsultationController],
  providers: [ConsultationService],
  exports: [ConsultationService],
})
export class ConsultationModule {}
