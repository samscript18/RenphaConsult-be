import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Destination, DestinationDocument } from './schema/destination.schema';

@Injectable()
export class DestinationService {
  constructor(
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<DestinationDocument>,
  ) {}

  async create(
    createDestinationDto: CreateDestinationDto,
  ): Promise<DestinationDocument> {
    const destination =
      await this.destinationModel.create(createDestinationDto);
    return destination;
  }

  async findAll(): Promise<DestinationDocument[]> {
    const destinations = await this.destinationModel.find();
    return destinations;
  }

  async searchByLocation(location: string): Promise<DestinationDocument[]> {
    const destination = await this.destinationModel.find({
      location: { $regex: location, $options: 'i' },
    });
    return destination;
  }

  async recommendByBudget(budget: number): Promise<DestinationDocument[]> {
    const destination = await this.destinationModel.find({
      budget: { $lte: budget },
    });
    return destination;
  }

  async findOne(destinationId: string): Promise<DestinationDocument> {
    try {
      const ID = new Types.ObjectId(destinationId);
      const destination = await this.destinationModel.findById(ID);
      return destination;
    } catch (error) {
      throw new NotFoundException(
        `Destination with id ${destinationId} not found`,
        {
          cause: error,
        },
      );
    }
  }

  async update(
    destinationId: string,
    updateDestinationDto: UpdateDestinationDto,
  ): Promise<DestinationDocument> {
    try {
      const destination = await this.destinationModel.findByIdAndUpdate(
        destinationId,
        updateDestinationDto,
        { new: true, runValidators: true },
      );
      return destination;
    } catch (error) {
      throw new NotFoundException(
        `Destination with id ${destinationId} not found`,
        {
          cause: error,
        },
      );
    }
  }

  async remove(destinationId: string): Promise<string> {
    try {
      await this.destinationModel.findByIdAndDelete(destinationId);
      return `Destination with id ${destinationId} has been deleted`;
    } catch (error) {
      throw new BadRequestException(
        `Destination with id ${destinationId} not found`,
        {
          cause: error,
        },
      );
    }
  }
}
