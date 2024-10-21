import { Controller, Get, Param, Res, Req, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('profile')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get Profile' })
  getUserProfile(@Req() req: Request, @Res() res: Response) {
    res.json(req.user);
  }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get Users' })
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get Single User' })
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Update Profile' })
  updateUserProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
