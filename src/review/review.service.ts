import { Injectable, NotFoundException } from '@nestjs/common';
import { AddReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserDocument } from 'src/user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schema/review.schema';
import { Model, Types } from 'mongoose';
import { DestinationService } from 'src/destination/destination.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
    private destinationService: DestinationService,
  ) {}

  async createReview(
    destinationId: string,
    addReviewDto: AddReviewDto,
    user: UserDocument,
  ): Promise<ReviewDocument> {
    const destination = await this.destinationService.findOne(destinationId);
    if (!destination) {
      throw new NotFoundException('Destination does not exist');
    }
    const review = await this.reviewModel.create({
      user: user._id,
      destination: destination._id,
      comment: addReviewDto.comment,
      rating: addReviewDto.rating,
    });
    destination.reviews.push(review);
    destination.totalReviews += 1;
    destination.totalRatings += addReviewDto.rating;
    destination.averageRating =
      destination.totalRatings / destination.totalReviews;
    await destination.save();
    return review;
  }

  async getReviews(destinationId: string) {
    const id = new Types.ObjectId(destinationId);
    const reviews = await this.reviewModel.find({
      destination: id,
    });
    return reviews;
  }

  async updateReview(
    reviewId: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewDocument> {
    const updatedReview = await this.reviewModel.findByIdAndUpdate(
      reviewId,
      updateReviewDto,
      {
        new: true,
        runValidators: true,
      },
    );
    return updatedReview;
  }

  async deleteReview(reviewId: string): Promise<ReviewDocument> {
    const review = await this.reviewModel.findByIdAndDelete(reviewId);
    return review;
  }
}
