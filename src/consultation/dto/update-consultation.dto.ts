import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateConsultationDto {
  @ApiProperty({
    example: 'Yeah, let us do this',
  })
  @IsOptional()
  @IsString()
  response: string;

  @ApiProperty({
    example: 'pending',
  })
  @IsOptional()
  @IsIn(['pending', 'responded'])
  status: string;
}
