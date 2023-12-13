import { BadRequestException, Injectable } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  generatesNotificationRecord,
  getNotificationsRecords,
} from './mappers/notification.mapper';
import { GetNotificationsDto } from './dto/get-notification.dto';
import { applyParamsToSearch } from '@/shared/utils/applyParamsToSearch';

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

  async findAll(queryParams: GetNotificationsDto) {
    try {
      const { pageNumber, pageSize, ...rest } = queryParams;
      const options = {
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        where: {},
      };

      const searchParams = applyParamsToSearch(rest, options);

      return getNotificationsRecords(
        await this.notificationRepository.findAndCount({
          ...searchParams,
        }),
      );
    } catch (e) {
      throw e;
    }
  }
}
