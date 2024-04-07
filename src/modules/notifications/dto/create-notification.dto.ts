import { ApiProperty, PickType } from '@nestjs/swagger';
import { Notification } from '../entities/notification.entity';
import { HttpStatus } from '@nestjs/common';

export class CreateNotificationDto extends PickType(Notification, [
  'approvement',
  'emitterId',
  'analystId',
  'rolId',
  'title',
  'entityId',
] as const) {}

export class CreatedNotificationDto {
  @ApiProperty({
    description: 'Notificación creada',
    type: Notification,
    required: true,
  })
  data: Notification;

  @ApiProperty({
    description: 'Codigo de estatus de la solicitud',
    type: Number,
    required: true,
    default: 201,
  })
  status: HttpStatus.CREATED;
}
