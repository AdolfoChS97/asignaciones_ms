import { Approvement } from '@/modules/approvements/entities/approvement.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Notifications' })
export class Notification {
  @ApiProperty({
    description: 'ID de la notificación',
    example: 1,
    type: 'number',
    required: false,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'ID del estado al cual pertenece el usuario',
    example: 1,
    type: 'number',
    required: true,
  })
  @Column({ type: 'integer', nullable: false })
  entityId: number; // id del usuario que recibe la notificación

  @ApiProperty({
    description: 'ID de la solicitud de aprobación',
    example: 1,
    type: 'number',
    required: true,
  })
  @ManyToOne(() => Approvement, (approvement) => approvement.notifications)
  @JoinColumn({ name: 'approvement' })
  approvement: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    nullable: true,
    description: 'ID del usuario que analiza la notificación',
    required: false,
  })
  @Column({ type: 'integer', nullable: true })
  analystId: number | null;

  @ApiProperty({
    description: 'ID del usuario que envía la notificación',
    example: 1,
    type: 'number',
    required: true,
  })
  @Column({ type: 'integer', nullable: false })
  emitterId: number; // id del usuario que envía la notificación

  @ApiProperty({
    description: 'Rol del usuario que recibe la notificación',
    example: 1,
    type: 'number',
    required: true,
  })
  @Column({ type: 'integer', nullable: true })
  rolId: number; // id del rol que recibe la notificación

  @ApiProperty({
    description: 'Titulo de la notificación',
    example: 'Titulo de notificación',
    type: 'string',
    required: true,
  })
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty({
    description: 'Descripción de la notificación',
    example: 'Descripción de notificación',
    type: 'string',
    required: false,
    default: 'Sin descripción disponible',
  })
  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Estado de la notificación true(Leida) false(no leida))',
    example: false,
    type: 'boolean',
    default: false,
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  status: boolean;

  @ApiProperty({
    description: 'Fecha de creación de la notificación',
    example: '2021-01-01',
    required: false,
    default: new Date(),
  })
  @Column({ type: 'timestamptz', default: new Date() })
  createdAt?: Date;

  @ApiProperty({
    description: 'Fecha de actualización de la notificación',
    example: '2021-01-01',
    required: false,
    default: new Date(),
  })
  @Column({ type: 'timestamptz', default: new Date() })
  updatedAt?: Date;
}
