import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConsultationDto {
  @ApiProperty({
    example: 'Jane Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'janedoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+2349045367488',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    example: 'Abeokuta, Ogun state',
  })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({
    example: 'Hi, can we schedule a meeting?',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
