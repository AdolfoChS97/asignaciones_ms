import { ApiProperty, PickType } from '@nestjs/swagger';
import { Notification } from '../entities/notification.entity';

export class UpdateNotificationDto extends PickType(Notification, [
  'approvement',
  'emitterId',
  'rolId',
  'title',
  'description',
  'status',
]) {}

export class UpdatedNotificationDto {
  @ApiProperty({
    type: 'number',
    example: { rowsAffected: 1 },
    description: 'Numero de registro afectados',
  })
  data: { rowsAffected: number };

  @ApiProperty({
    type: 'number',
    example: 200,
    description: 'Codigo de la respuesta',
  })
  status: number;
}
