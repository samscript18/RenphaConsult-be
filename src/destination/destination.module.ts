import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Destination, DestinationSchema } from './schema/destination.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Destination.name,
        schema: DestinationSchema,
      },
    ]),
  ],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
