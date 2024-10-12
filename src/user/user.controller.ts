import { Controller, Get, Param, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Get Profile' })
  getUserProfile(@Req() req: Request, @Res() res: Response) {
    res.json(req.user);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get Users' })
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get Single User' })
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
