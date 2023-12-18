import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseTsModule } from '@shared/modules/database.module';
import { DocumentsModule } from '@modules/documents/documents.module';
import { EvaluationsModule } from '@modules/evaluations/evaluations.module';
import { ObservationsModule } from '@modules/observations/observations.module';
import { ApprovementsModule } from '@modules/approvements/approvements.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { ParametersModule } from '@modules/parameters/parameters.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SharedModule } from '@shared/modules/shared.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/src*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    SharedModule,
    DatabaseTsModule,
    DocumentsModule,
    ObservationsModule,
    ApprovementsModule,
    EvaluationsModule,
    ObservationsModule,
    NotificationsModule,
    ParametersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
