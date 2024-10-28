import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(signUpDto: SignUpDto): Promise<UserDocument> {
    const userExists = await this.findUserByEmail(signUpDto.email);
    if (userExists) {
      throw new BadRequestException(`User with this email already exists`);
    }
    const user = await this.userModel.create(signUpDto);
    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} is not found`, error);
    }
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
        runValidators: true,
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} does not exist`, {
        cause: error,
      });
    }
  }
}
