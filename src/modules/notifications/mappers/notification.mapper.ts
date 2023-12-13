import { HttpStatus } from '@nestjs/common';
import {
  GetNotificationsRecords,
  GetNotificationRecord,
} from '../dto/get-notification.dto';

export function generatesNotificationRecord(notification) {
  return { data: notification, status: HttpStatus.CREATED };
}

export function getNotificationsRecords(
  notifications,
): GetNotificationsRecords {
  return { data: notifications, status: HttpStatus.OK };
}

export function getNotificationRecord(notification): GetNotificationRecord {
  return { data: notification, status: HttpStatus.OK };
}
