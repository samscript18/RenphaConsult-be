import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/auth.decorator';
import { RoleNames } from 'src/user/enums';

@Controller('destination')
@ApiTags('Destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @ApiBearerAuth()
  @Post()
  @Roles([RoleNames.ADMIN])
  @ApiOperation({ summary: 'Add Destination' })
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.create(createDestinationDto);
  }

  @ApiBearerAuth()
  @Get()
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Get All Destinations' })
  findAll() {
    return this.destinationService.findAll();
  }

  @ApiBearerAuth()
  @Get('search')
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Search Destinations By Location' })
  search(@Query('search') location: string) {
    return this.destinationService.searchByLocation(location);
  }

  @ApiBearerAuth()
  @Get('recommend')
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Recommend Destinations By Budget' })
  recommend(@Query('recommend') budget: number) {
    return this.destinationService.recommendByBudget(budget);
  }

  @ApiBearerAuth()
  @Get(':destinationId')
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Get Single Destination' })
  findOne(@Param('destinationId') destinationId: string) {
    return this.destinationService.findOne(destinationId);
  }

  @ApiBearerAuth()
  @Patch(':destinationId')
  @Roles([RoleNames.ADMIN])
  @ApiOperation({ summary: 'Update Destination' })
  update(
    @Param('destinationId') destinationId: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationService.update(destinationId, updateDestinationDto);
  }

  @ApiBearerAuth()
  @Delete(':destinationId')
  @Roles([RoleNames.ADMIN])
  @ApiOperation({ summary: 'Delete Destination' })
  remove(@Param('destinationId') destinationId: string) {
    return this.destinationService.remove(destinationId);
  }
}
