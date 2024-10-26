import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User, UserDocument } from './schema/user.schema';
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
    return user;
  }

  @ApiBearerAuth()
  @Get()
  @Roles([RoleNames.ADMIN])
  @ApiOperation({ summary: 'Get Users' })
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles([RoleNames.USER, RoleNames.ADMIN])
  @ApiOperation({ summary: 'Get Single User' })
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Update Profile' })
  updateUserProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
