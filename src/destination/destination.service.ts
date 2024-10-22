import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Destination, DestinationDocument } from './schema/destination.schema';
import { ReviewDto } from './dto/create-review.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DestinationService {
  constructor(
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<DestinationDocument>,
    private userService: UserService,
  ) {}

  async create(
    createDestinationDto: CreateDestinationDto,
  ): Promise<Destination> {
    const destination =
      await this.destinationModel.create(createDestinationDto);
    return destination;
  }

  async findAll(): Promise<Destination[]> {
    const destinations = await this.destinationModel.find();
    return destinations;
  }

  async searchByLocation(location: string): Promise<Destination[]> {
    const destination = await this.destinationModel.find({
      location: { $regex: location, $options: 'i' },
    });
    return destination;
  }

  async recommendByBudget(budget: number): Promise<Destination[]> {
    const destination = await this.destinationModel.find({
      budget: { $lte: budget },
    });
    return destination;
  }

  async findOne(id: string): Promise<Destination> {
    try {
      const destination = await this.destinationModel.findById(id).populate({
        path: 'reviews.userId',
        select: 'firstName lastName email profilePicture',
      });
      return destination;
    } catch (error) {
      throw new NotFoundException(`Destination with id ${id} not found`, {
        cause: error,
      });
    }
  }

  async update(
    id: string,
    updateDestinationDto: UpdateDestinationDto,
  ): Promise<Destination> {
    try {
      const destination = await this.destinationModel.findByIdAndUpdate(
        id,
        updateDestinationDto,
        { new: true, runValidators: true },
      );
      return destination;
    } catch (error) {
      throw new NotFoundException(`Destination with id ${id} not found`, {
        cause: error,
      });
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.destinationModel.findByIdAndDelete(id);
      return `Destination with id ${id} has been deleted`;
    } catch (error) {
      throw new BadRequestException(`Destination with id ${id} not found`, {
        cause: error,
      });
    }
  }

  async addReview(
    id: string,
    reviewDto: ReviewDto,
    user: User,
  ): Promise<Destination> {
    const { _id: userId } = await this.userService.findUserByEmail(user.email);
    const destination = await this.destinationModel.findById(id);
    if (!destination) {
      throw new NotFoundException(`Destination with id ${id} cannot be found`);
    }
    destination.reviews.push({
      userId: userId,
      comment: reviewDto.comment,
      rating: reviewDto.rating,
    });
    destination.totalReviews += 1;
    destination.totalRatings += reviewDto.rating;
    destination.averageRating =
      destination.totalRatings / destination.totalReviews;
    await destination.save();
    return destination;
  }
}
