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
import { Auth, Roles } from 'src/auth/guard/auth.decorator';
import { RoleNames } from 'src/user/enums';

@Controller('consultation')
@ApiTags('Consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @ApiBearerAuth()
  @Post()
  @Roles([RoleNames.USER])
  @ApiOperation({ summary: 'Create Consultation' })
  create(
    @Body() createConsultationDto: CreateConsultationDto,
    @Auth('_id') userId: string,
  ) {
    return this.consultationService.create(createConsultationDto, userId);
  }

  @ApiBearerAuth()
  @Get()
  @Roles([RoleNames.ADMIN])
  @ApiOperation({ summary: 'Get All Consultations' })
  findAll() {
    return this.consultationService.findAll();
  }

  @ApiBearerAuth()
  @Get(':consultationId')
  @Roles([RoleNames.USER, RoleNames.ADMIN])
  @ApiOperation({ summary: 'Get Consultation' })
  findOne(@Param('consultationId') consultationId: string) {
    return this.consultationService.findOne(consultationId);
  }

  @ApiBearerAuth()
  @Patch(':consultationId')
  @Roles([RoleNames.ADMIN])
  @ApiOperation({ summary: 'Update Consultation' })
  update(
    @Param('consultationId') consultationId: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationService.update(
      consultationId,
      updateConsultationDto,
    );
  }

  @ApiBearerAuth()
  @Delete(':consultationId')
  @Roles([RoleNames.ADMIN])
  @ApiOperation({ summary: 'Delete Consultation' })
  remove(@Param('consultationId') consultationId: string) {
    return this.consultationService.remove(consultationId);
  }
}
