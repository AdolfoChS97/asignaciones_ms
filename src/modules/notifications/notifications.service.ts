import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  generatesNotificationRecord,
  getNotificationRecord,
  getNotificationsRecords,
} from './mappers/notification.mapper';
import {
  GetNotificationDto,
  GetNotificationRecord,
  GetNotificationsDto,
} from './dto/get-notification.dto';
import { applyParamsToSearch } from '@/shared/utils/applyParamsToSearch';
import { ApprovementsService } from '@modules/approvements/approvements.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly approvementService: ApprovementsService,
  ) {}

  async create({
    approvement,
    emitterId,
    rolId,
    title,
  }: CreateNotificationDto) {
    try {
      if (!approvement && !Number.isInteger(+approvement))
        throw new BadRequestException(
          'approvement is required and should be a number',
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
          approvement,
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

      const notifications = await this.notificationRepository
        .createQueryBuilder('notification')
        .innerJoinAndSelect('notification.approvement', 'approvement')
        .select(['notification', 'approvement.id'])
        .skip(options.skip)
        .take(options.take)
        .where(searchParams.where)
        .getMany();

      return getNotificationsRecords(notifications);
    } catch (e) {
      throw e;
    }
  }

  async findOne(
    id: number,
    { approvement, rolId, emitterId }: GetNotificationDto,
  ): Promise<GetNotificationRecord> {
    try {
      await this.approvementService.findOne(+approvement, {});

      const options = { where: {} };
      const searchParams = applyParamsToSearch(
        {
          rolId: rolId,
          id: id,
          approvement: approvement,
          emitterId: emitterId,
        },
        options,
      );
      const notification = await this.notificationRepository
        .createQueryBuilder('notification')
        .innerJoinAndSelect('notification.approvement', 'approvement')
        .select(['notification', 'approvement.id'])
        .where(searchParams.where)
        .getOne();

      if (!notification)
        throw new NotFoundException('La notificación no existe');

      return getNotificationRecord(notification);
    } catch (e) {
      throw e;
    }
  }
}
