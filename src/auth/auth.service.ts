import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/user/dto/signup-user.dto';
import { LoginDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async register(signUpDto: SignUpDto): Promise<User> {
    return this.userService.create(signUpDto);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.userService.findUserByEmail(loginDto.email);
    const isMatch = await this.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Incorrect password');
    }
    return await this.jwtService.signAsync({
      userEmail: user.email,
    });
  }
}
