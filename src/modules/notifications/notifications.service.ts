import { BadRequestException, Injectable } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generatesNotificationRecord } from './mappers/notification.mapper';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create({
    approvementId,
    emitterId,
    rolId,
    title,
  }: CreateNotificationDto) {
    try {
      if (!approvementId && !Number.isInteger(+approvementId))
        throw new BadRequestException(
          'approvementId is required and should be a number',
        );

      if (!emitterId && !Number.isInteger(+emitterId))
        throw new BadRequestException(
          'emitterId is required and should be a number',
        );

      if (!rolId && !Number.isInteger(+rolId))
        throw new BadRequestException(
          'rolId is required and should be a number',
        );

      if (!title) throw new BadRequestException('title is required');

      return await generatesNotificationRecord(
        await this.notificationRepository.save({
          approvementId,
          emitterId,
          rolId,
          title,
        }),
      );
    } catch (e) {
      throw e;
    }
  }
}
