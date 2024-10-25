import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AddReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Roles } from 'src/roles/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/roles/role.enum';
import { Request } from 'express';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBearerAuth()
  @Post('/destination/:destinationId')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Add Review To Destination' })
  addReviewToDestination(
    @Param('destinationId') destinationId: string,
    @Body() addReviewDto: AddReviewDto,
    @Req() req: Request,
  ) {
    const user = req.user;
    return this.reviewService.createReview(destinationId, addReviewDto, user);
  }

  @ApiBearerAuth()
  @Get('/destination/:destinationId')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get Destination Reviews' })
  findDestinationReviews(@Param('destinationId') destinationId: string) {
    return this.reviewService.getReviews(destinationId);
  }

  @ApiBearerAuth()
  @Put(':reviewId')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Update Review' })
  updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, updateReviewDto);
  }

  @ApiBearerAuth()
  @Delete(':reviewId')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Delete Review' })
  deleteReview(@Param('reviewId') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }
}
