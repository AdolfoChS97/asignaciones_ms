import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import { Notification } from '../entities/notification.entity';
import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

class QueryParamsNotification extends PickType(Notification, [
  'approvement',
  'emitterId',
  'analystId',
  'rolId',
  'entityId',
]) {}

export class GetNotificationsDto extends IntersectionType(
  PartialType(PaginationQueryParamsDto),
  PartialType(QueryParamsNotification),
) {}

export class GetNotificationDto extends IntersectionType(
  PartialType(PaginationQueryParamsDto),
  PartialType(QueryParamsNotification),
) {}

export class GetNotificationsRecords {
  @ApiProperty({ type: [Notification], description: 'Lista de notificaciones' })
  data: Notification[];

  @ApiProperty({ type: Number, description: 'Estatus de la petición' })
  status: HttpStatus.OK;
}

export class GetNotificationRecord {
  @ApiProperty({ type: [Notification], description: 'Lista de notificaciones' })
  data: Notification[];

  @ApiProperty({ type: Number, description: 'Estatus de la petición' })
  status: HttpStatus.OK;
}
