import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AddReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, Roles } from 'src/auth/guard/auth.decorator';
import { UserDocument } from 'src/user/schema/user.schema';
import { RoleNames } from 'src/user/enums';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBearerAuth()
  @Post('/destination/:destinationId')
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Add Review To Destination' })
  addReviewToDestination(
    @Param('destinationId') destinationId: string,
    @Body() addReviewDto: AddReviewDto,
    @Auth() user: UserDocument,
  ) {
    return this.reviewService.createReview(destinationId, addReviewDto, user);
  }

  @ApiBearerAuth()
  @Get('/destination/:destinationId')
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Get Destination Reviews' })
  findDestinationReviews(@Param('destinationId') destinationId: string) {
    return this.reviewService.getReviews(destinationId);
  }

  @ApiBearerAuth()
  @Put(':reviewId')
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Update Review' })
  updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, updateReviewDto);
  }

  @ApiBearerAuth()
  @Delete(':reviewId')
  @Roles([RoleNames.USER, RoleNames.ADMIN])
  @ApiOperation({ summary: 'Delete Review' })
  deleteReview(@Param('reviewId') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }
}
