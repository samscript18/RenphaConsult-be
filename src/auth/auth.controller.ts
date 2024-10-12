import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/user/dto/signup-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/user/dto/login-user.dto';
import { Response } from 'express';
import { Public } from './guard/auth.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/schema/user.schema';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async hashPassword(password: string): Promise<string> {
    const saltFactor = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, saltFactor);
  }

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Register' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    signUpDto.password = await this.hashPassword(signUpDto.password);
    return this.authService.register(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(loginDto);
    res.json({ accessToken });
  }
}
