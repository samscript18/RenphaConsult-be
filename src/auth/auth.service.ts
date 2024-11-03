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

  async register(signUpDto: SignUpDto): Promise<Partial<UserDocument>> {
    const { _id, firstName, lastName, email, role, profilePicture, __v } =
      await this.userService.create(signUpDto);
    await this.mailService.sendMail({
      to: email,
      subject: 'RenphaConsulting - Registration Successful',
      template: 'registration',
      context: {
        firstName,
      },
    });
    return { _id, firstName, lastName, email, role, profilePicture, __v };
  }

  async login(loginDto: LoginDto): Promise<string> {
    const user: UserDocument = await this.userService.findUserByEmail(
      loginDto.email,
    );
    if (!user) {
      throw new BadRequestException('Invalid login credentials');
    }

    const isMatch = await this.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Incorrect password');
    }
    return await this.jwtService.signAsync({ ...user.toObject() });
  }
  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
