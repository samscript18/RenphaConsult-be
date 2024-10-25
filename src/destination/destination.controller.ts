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
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('destination')
@ApiTags('Destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @ApiBearerAuth()
  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Add Destination' })
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.create(createDestinationDto);
  }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get All Destinations' })
  findAll() {
    return this.destinationService.findAll();
  }

  @ApiBearerAuth()
  @Get('search')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Search Destinations By Location' })
  search(@Query('search') location: string) {
    return this.destinationService.searchByLocation(location);
  }

  @ApiBearerAuth()
  @Get('recommend')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Recommend Destinations By Budget' })
  recommend(@Query('recommend') budget: number) {
    return this.destinationService.recommendByBudget(budget);
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get Single Destination' })
  findOne(@Param('id') id: string) {
    return this.destinationService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update Destination' })
  update(
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationService.update(id, updateDestinationDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete Destination' })
  remove(@Param('id') id: string) {
    return this.destinationService.remove(id);
  }
}
