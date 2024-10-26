import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/user/dto/signup-user.dto';
import { LoginDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/schema/user.schema';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(signUpDto: SignUpDto): Promise<UserDocument> {
    const user = await this.userService.create(signUpDto);
    await this.mailService.sendMail({
      to: user.email,
      subject: 'RenphaConsulting - Registration Successful',
      template: 'registration',
      context: {
        firstName: user.firstName,
      },
    });
    return user;
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
      user,
    });
  }
  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
