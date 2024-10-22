import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Destination,
  DestinationSchema,
} from 'src/destination/schema/destination.schema';
import { SeedService } from './seed.service';
import {
  Consultation,
  ConsultationSchema,
} from 'src/consultation/schema/consultation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Destination.name,
        schema: DestinationSchema,
      },
      {
        name: Consultation.name,
        schema: ConsultationSchema,
      },
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
