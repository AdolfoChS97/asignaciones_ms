import { HttpStatus } from '@nestjs/common';

export function generatesNotificationRecord(notification) {
  return { data: notification, status: HttpStatus.CREATED };
}

export function getNotificationsRecords(notifications) {
  const [data, total] = notifications;
  return { data: data, total: total, status: HttpStatus.OK };
}
