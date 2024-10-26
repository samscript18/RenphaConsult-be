import { GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const GEMINI_AI_PROVIDER = 'GEMINI_AI_PROVIDER';

export const GeminiAIProvider: Provider = {
  provide: GEMINI_AI_PROVIDER,
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const GEMINI_AI_API_KEY = configService.get<string>('geminiAiApiKey');
    const genai = new GoogleGenerativeAI(GEMINI_AI_API_KEY);

    const model = genai.getGenerativeModel({ model: 'gemini-1.5-flash' });

    return model;
  },
};
