import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { GeminiAIProvider } from './ai.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [GeminiAIProvider, AIService],
  exports: [AIService],
})
export class AIModule {}
