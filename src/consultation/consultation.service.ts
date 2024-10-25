import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Consultation,
  ConsultationDocument,
} from './schema/consultation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private readonly consultationModel: Model<ConsultationDocument>,
  ) {}

  async create(
    createConsultationDto: CreateConsultationDto,
  ): Promise<ConsultationDocument> {
    let consultationHistory: string[];
    const data = { ...createConsultationDto, consultationHistory };
    data.consultationHistory.push(`message: ${data.message}`);
    const consultation = await this.consultationModel.create(data);
    return consultation;
  }

  async findAll(): Promise<ConsultationDocument[]> {
    const consultations = await this.consultationModel.find();
    return consultations;
  }

  async findOne(id: string): Promise<ConsultationDocument> {
    try {
      const consultation = await this.consultationModel.findById(id);
      return consultation;
    } catch (error) {
      throw new BadRequestException(`Consultation id ${id} does not exist`, {
        cause: error,
      });
    }
  }

  async update(
    id: string,
    updateConsultationDto: UpdateConsultationDto,
  ): Promise<ConsultationDocument> {
    try {
      let consultationHistory: string[];
      const data = { ...updateConsultationDto, consultationHistory };
      data.consultationHistory.push(
        `response: ${updateConsultationDto.response}`,
      );
      const updatedConsultation =
        await this.consultationModel.findByIdAndUpdate(
          id,
          {
            ...data,
            status: 'responded',
            respondedAt: new Date(),
          },
          { new: true, runValidators: true },
        );
      return updatedConsultation;
    } catch (error) {
      throw new BadRequestException(`Consultation id ${id} does not exist`, {
        cause: error,
      });
    }
  }

  async remove(id: string): Promise<string> {
    try {
      await this.consultationModel.findByIdAndDelete(id);
      return 'Consultation with id ${id} has been deleted';
    } catch (error) {
      throw new BadRequestException(`Consultation id ${id} does not exist`, {
        cause: error,
      });
    }
  }
}
