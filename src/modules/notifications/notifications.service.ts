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
  generatesUpdatedNotificationRecord,
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
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { checkProperties } from '@/shared/utils/checkProperties';
import { isBoolean } from 'class-validator';

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
    analystId,
    rolId,
    title,
    entityId,
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

      if (!entityId && !Number.isInteger(+entityId))
        throw new BadRequestException(
          'entityId is required and should be a number',
        );

      if (!title) throw new BadRequestException('title is required');

      return await generatesNotificationRecord(
        await this.notificationRepository.save({
          approvement,
          emitterId,
          rolId,
          title,
          entityId,
          analystId,
          createdAt: new Date(),
          updatedAt: new Date(),
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
        .orderBy('notification.createdAt', 'DESC')
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
    { approvement, rolId, emitterId, entityId, analystId }: GetNotificationDto,
  ): Promise<GetNotificationRecord> {
    try {
      await this.approvementService.findOne(+approvement);

      const options = { where: {} };
      const searchParams = applyParamsToSearch(
        {
          rolId: rolId,
          id: id,
          approvement: approvement,
          emitterId: emitterId,
          entityId: entityId,
          analystId: analystId,
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

  async update(
    id: number,
    {
      approvement,
      emitterId,
      analystId,
      rolId,
      title,
      description,
      status,
      entityId,
    }: UpdateNotificationDto,
  ) {
    try {
      isBoolean(status);

      if (!approvement && !Number.isInteger(+approvement))
        throw new BadRequestException(
          'approvement is required and should be a number',
        );

      if (!analystId && !Number.isInteger(+analystId))
        throw new BadRequestException(
          'analystId is required and should be a number',
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

      if (!description)
        throw new BadRequestException('description is required');

      if (!status) throw new BadRequestException('status is required');

      if (!entityId && !Number.isInteger(+entityId))
        throw new BadRequestException(
          'entityId is required and should be a number',
        );

      const notification = await this.notificationRepository
        .createQueryBuilder('notification')
        .innerJoinAndSelect('notification.approvement', 'approvement')
        .select(['notification', 'approvement.id'])
        .where('notification.id = :id', { id: id })
        .getOne();

      if (!notification)
        throw new NotFoundException('La notificación no existe');

      const propertiesToUpdate = checkProperties({
        approvement,
        emitterId,
        analystId,
        rolId,
        title,
        description,
        status,
        entityId,
        updatedAt: new Date(),
      }) as unknown as Notification;

      if (Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No properties to update');

      const updatedNotification = await this.notificationRepository.update(
        id,
        propertiesToUpdate,
      );

      return generatesUpdatedNotificationRecord(updatedNotification);
    } catch (e) {
      throw e;
    }
  }
}
