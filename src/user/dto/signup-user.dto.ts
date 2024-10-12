import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class SignUpDto {
  @ApiProperty({ example: 'jane' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'janedoe@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'jane123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsEnum(['USER', 'ADMIN'], { each: true })
  @IsOptional()
  role: Role;
}
