import { Body, Controller, Post, Res } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  CreateNotificationDto,
  CreatedNotificationDto,
} from './dto/create-notification.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        approvementId: {
          type: 'number',
          example: 1,
          description: 'ID de la solicitud de aprobación',
        },
        emitterId: {
          type: 'number',
          example: 1,
          description: 'ID del usuario que envía la notificación',
        },
        rolId: {
          type: 'number',
          example: 1,
          description: 'Rol del usuario que recibe la notificación',
        },
        title: {
          type: 'string',
          example: 'Titulo de notificación',
          description: 'Titulo de la notificación',
        },
      },
    },
    description:
      'Crea una notificación nueva, que por defecto es marcada como no leída o no vista con el estatus false',
  })
  @ApiCreatedResponse({
    type: CreatedNotificationDto,
    description: 'Ejemplo de respuesta al crear la notificación',
  })
  @ApiBadRequestResponse({
    description: 'Error al crear la notificación',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Descripción del error de validación',
          description: 'Mensaje de error',
        },
        statusCode: {
          type: 'number',
          example: 400,
          description: 'Código de error',
        },
        error: {
          type: 'string',
          example: 'Bad Request',
          description: 'Nombre del error',
        },
      },
    },
  })
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
    @Res() response,
  ) {
    try {
      const { status, data } = await this.notificationsService.create(
        createNotificationDto,
      );
      return response.status(status).json(data);
    } catch (e) {
      throw e;
    }
  }
}
