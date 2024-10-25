import { PartialType } from '@nestjs/swagger';
import { AddReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(AddReviewDto) {}
