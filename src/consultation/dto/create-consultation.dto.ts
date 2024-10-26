import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConsultationDto {
  @ApiProperty({
    example: 'How does Erin Ijesha waterfall looks like?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    example: 'Erin Ijesha waterfall?',
  })
  @IsString()
  @IsNotEmpty()
  destination: string;
}
