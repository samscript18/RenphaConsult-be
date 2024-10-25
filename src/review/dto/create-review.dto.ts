import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class AddReviewDto {
  @ApiProperty({
    example: 4,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 'Great place to visit',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
