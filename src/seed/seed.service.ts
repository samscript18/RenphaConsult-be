import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as fs from 'fs';
// import * as path from 'path';
import {
  Destination,
  DestinationDocument,
} from 'src/destination/schema/destination.schema';
import {
  Consultation,
  ConsultationDocument,
} from 'src/consultation/schema/consultation.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<DestinationDocument>,
    @InjectModel(Consultation.name)
    private readonly consultationModel: Model<ConsultationDocument>,
  ) {}

  async seedDestinations(): Promise<void> {
    // const destinationsFilePath = path.join(
    //   __dirname,
    //   '..',
    //   '..',
    //   'src',
    //   'seed',
    //   'data',
    //   'destinations.json',
    // );
    // const consultationsFilePath = path.join(
    //   __dirname,
    //   '..',
    //   '..',
    //   'src',
    //   'seed',
    //   'data',
    //   'consultations.json',
    // );
    // console.log(destinationsFilePath);
    // console.log(consultationsFilePath);
    // const destinations = JSON.parse(
    //   fs.readFileSync(destinationsFilePath, 'utf8'),
    // );
    // const consultations = JSON.parse(
    //   fs.readFileSync(consultationsFilePath, 'utf8'),
    // );
    // await this.destinationModel.insertMany(destinations);
    // await this.consultationModel.insertMany(consultations);
    // console.log('Seeding complete');
  }
}
