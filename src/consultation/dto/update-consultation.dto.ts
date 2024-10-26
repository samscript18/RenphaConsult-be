import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateConsultationDto {
  @ApiProperty({
    example: 'This is the response from the AI',
  })
  @IsOptional()
  @IsString()
  response: string;
}
