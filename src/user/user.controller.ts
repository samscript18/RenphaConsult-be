import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDocument } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, Roles } from 'src/auth/guard/auth.decorator';
import { RoleNames } from './enums';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('profile')
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Get Profile' })
  getUserProfile(@Auth() user: UserDocument) {
    const { _id, firstName, lastName, email, profilePicture, role, __v } = user;
    return { _id, firstName, lastName, email, profilePicture, role, __v };
  }

  @ApiBearerAuth()
  @Get()
  @Roles([RoleNames.ADMIN])
  @ApiOperation({ summary: 'Get Users' })
  async getAllUsers(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get(':userId')
  @Roles([RoleNames.USER, RoleNames.ADMIN])
  @ApiOperation({ summary: 'Get Single User' })
  async getUser(@Param('userId') userId: string): Promise<UserDocument> {
    return this.userService.findOne(userId);
  }

  @ApiBearerAuth()
  @Put(':userId')
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Update Profile' })
  updateUserProfile(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
