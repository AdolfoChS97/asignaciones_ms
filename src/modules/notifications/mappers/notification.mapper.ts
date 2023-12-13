import { HttpStatus } from '@nestjs/common';
import { GetNotificationsRecords } from '../dto/get-notification.dto';

export function generatesNotificationRecord(notification) {
  return { data: notification, status: HttpStatus.CREATED };
}

export function getNotificationsRecords(
  notifications,
): GetNotificationsRecords {
  const [data, total] = notifications;
  return { data: data, meta: total, status: HttpStatus.OK };
}
