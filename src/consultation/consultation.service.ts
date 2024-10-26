import { Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Consultation,
  ConsultationDocument,
} from './schema/consultation.schema';
import { Model } from 'mongoose';
import { AIService } from 'src/ai/ai.service';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private readonly consultationModel: Model<ConsultationDocument>,
    private aiService: AIService,
  ) {}

  async create(
    createConsultationDto: CreateConsultationDto,
    userId: string,
  ): Promise<ConsultationDocument> {
    const consultation = await this.consultationModel.create({
      userId,
      ...createConsultationDto,
    });
    const generatedResponse = await this.aiService.generateResponse(
      consultation.question,
      consultation.destination,
    );
    consultation.consultationHistory.push({
      question: createConsultationDto.question,
      response: generatedResponse,
    });
    await consultation.save();
    return consultation;
  }

  async findAll(): Promise<ConsultationDocument[]> {
    const consultations = await this.consultationModel.find();
    return consultations;
  }

  async findOne(id: string): Promise<ConsultationDocument> {
    const consultation = await this.consultationModel.findById(id);
    return consultation;
  }

  async update(
    id: string,
    updateConsultationDto: UpdateConsultationDto,
  ): Promise<ConsultationDocument> {
    const consultation = await this.consultationModel.findById(id);
    consultation.response = updateConsultationDto.response;
    consultation.consultationHistory.push({
      question: consultation.question,
      response: updateConsultationDto.response,
    });
    await consultation.save();
    return consultation;
  }

  async remove(id: string): Promise<ConsultationDocument> {
    const consultation = this.consultationModel.findByIdAndDelete(id);
    return consultation;
  }
}
