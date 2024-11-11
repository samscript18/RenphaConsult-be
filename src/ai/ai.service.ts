import { GenerativeModel } from '@google/generative-ai';
import { Inject, Injectable } from '@nestjs/common';
import { GEMINI_AI_PROVIDER } from './ai.provider';

@Injectable()
export class AIService {
  constructor(
    @Inject(GEMINI_AI_PROVIDER) private readonly geminiAi: GenerativeModel,
  ) {}

  private GENERATOR_QUERY(question: string, destination: string) {
    return `Provide a comprehensive and engaging response to a travel-related question about the destination '${destination}'. The response should cover relevant travel advice, including:
- Key attractions, cultural insights, and popular activities at '${destination}'.
- Practical travel tips, like transportation, best travel seasons, and safety recommendations.
- Information on local cuisine, customs, or festivals that travelers might enjoy.
- If applicable, any known travel restrictions or health guidelines specific to '${destination}'.
Ensure the information is concise, accurate, and valuable for planning an enjoyable trip. Question:\n\n${question}`;
  }

  async generateResponse(question: string, destination: string) {
    const { response } = await this.geminiAi.generateContent(
      this.GENERATOR_QUERY(question, destination),
    );
    return response.text();
  }
}
