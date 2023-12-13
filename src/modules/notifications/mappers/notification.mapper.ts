import { HttpStatus } from '@nestjs/common';

export function generatesNotificationRecord(notification) {
  return { data: notification, status: HttpStatus.CREATED };
}
