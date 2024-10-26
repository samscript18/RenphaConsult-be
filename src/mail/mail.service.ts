import { BadRequestException, Injectable } from '@nestjs/common';
import { SendMail } from './interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(dto: SendMail) {
    const { to, subject, template, context } = dto;
    try {
      await this.mailerService.sendMail({
        from: 'noreply@RenphaConsulting.com',
        to,
        subject,
        template,
        context,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
