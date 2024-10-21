import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('consultation')
@ApiTags('Consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @ApiBearerAuth()
  @Post()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Create Consultation' })
  create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationService.create(createConsultationDto);
  }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get All Consultations' })
  findAll() {
    return this.consultationService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Get Single Consultation' })
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update Consultation' })
  update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationService.update(id, updateConsultationDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'Delete Consultation' })
  remove(@Param('id') id: string) {
    return this.consultationService.remove(id);
  }
}
