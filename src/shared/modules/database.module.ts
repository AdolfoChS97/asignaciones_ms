import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Document } from '@modules/documents/entities/document.entity';
import { Evaluation } from '@modules/evaluations/entities/evaluation.entity';
import { Observation } from '@modules/observations/entities/observations.entity';
import { Approvement } from '@/modules/approvements/entities/approvement.entity';
import { Notification } from '@/modules/notifications/entities/notification.entity';
import { Parameter } from '@modules/parameters/entities/parameter.entity';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      password: configService.get<string>('DB_PASS'),
      username: configService.get<string>('DB_USER'),
      entities: [
        Document,
        Observation,
        Evaluation,
        Approvement,
        Notification,
        Parameter,
      ],
      database: configService.get<string>('DB_NAME'),
      synchronize: configService.get<boolean>('DB_SYNC'),
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseTsModule {}
