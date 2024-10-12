import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from './signup-user.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {}
