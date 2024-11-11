import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateDestinationDto {
  @ApiProperty({ example: 'Olumo Rock' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      'This is a tourist center that can be found in Abeokuta, Ogun state',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/wdnapc0cs/image/upload/v1728733644/someImage.jpg',
  })
  @IsString()
  @IsNotEmpty()
  mainImage: string;

  @ApiProperty({
    example: [
      'https://res.cloudinary.com/wdnapc0cs/image/upload/v1728733644/someImage.jpg',
      'https://res.cloudinary.com/wdnapc0cs/image/upload/v1728733644/anotherImage.jpg',
      'https://res.cloudinary.com/wdnapc0cs/image/upload/v1728733644/differentImage.jpg',
    ],
  })
  @IsArray()
  @IsOptional()
  gallery: string[];

  @ApiProperty({
    example: 50000,
  })
  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @ApiProperty({
    example: 'Abeokuta, Ogun state',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}
