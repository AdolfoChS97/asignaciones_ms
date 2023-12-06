import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Document } from '@modules/documents/entities/document.entity';
import { Evaluation } from '@modules/evaluations/entities/evaluation.entity';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      password: configService.get<string>('DB_PASS'),
      username: configService.get<string>('DB_USER'),
      entities: [Document , Evaluation],
      database: configService.get<string>('DB_NAME'),
      synchronize: configService.get<boolean>('DB_SYNC'),
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseTsModule {}
