import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { ConsultationModule } from './consultation/consultation.module';
import { DestinationModule } from './destination/destination.module';
import { SeedService } from './seed/seed.service';
import { SeedModule } from './seed/seed.module';
import { ReviewModule } from './review/review.module';
import { MailModule } from './mail/mail.module';
import { AIModule } from './ai/ai.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    SeedModule,
    MailModule,
    AuthModule,
    UserModule,
    DestinationModule,
    AIModule,
    ConsultationModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seedDestinations();
  }
}
