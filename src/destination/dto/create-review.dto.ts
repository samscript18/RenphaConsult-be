import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewDto {
  @ApiProperty({
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 'Great place to visit',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
