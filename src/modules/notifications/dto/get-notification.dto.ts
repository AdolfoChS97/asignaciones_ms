import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import { Notification } from '../entities/notification.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

class QueryParamsNotification extends PickType(Notification, [
  'approvementId',
  'emitterId',
  'rolId',
]) {}

export class GetNotificationsDto extends IntersectionType(
  PartialType(PaginationQueryParamsDto),
  PartialType(QueryParamsNotification),
) {}

export class GetNotificationDto extends IntersectionType(
  PartialType(PaginationQueryParamsDto),
  PartialType(QueryParamsNotification),
) {}
