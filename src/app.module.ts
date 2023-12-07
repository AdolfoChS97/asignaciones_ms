import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseTsModule } from '@shared/modules/database.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ObservationsModule } from './modules/observations/observations.module';
import { ApprovementsModule } from './modules/approvements/approvements.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    DatabaseTsModule,
    DocumentsModule,
    ObservationsModule,
    ApprovementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
