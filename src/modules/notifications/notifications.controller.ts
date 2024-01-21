import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  CreateNotificationDto,
  CreatedNotificationDto,
} from './dto/create-notification.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetNotificationsDto,
  GetNotificationDto,
  GetNotificationsRecords,
} from './dto/get-notification.dto';
import {
  UpdateNotificationDto,
  UpdatedNotificationDto,
} from './dto/update-notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        approvement: {
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

  @Get()
  @ApiQuery({
    name: 'pageNumber',
    type: 'number',
    example: 1,
    description: 'Número de página',
    required: true,
  })
  @ApiQuery({
    name: 'pageSize',
    type: 'number',
    example: 10,
    description: 'Numero de registros por pagina',
    required: true,
  })
  @ApiQuery({
    name: 'approvement',
    type: 'number',
    example: 1,
    description: 'ID de la solicitud de aprobación',
    required: false,
  })
  @ApiQuery({
    name: 'rolId',
    type: 'number',
    example: 1,
    description: 'ID del rol del usuario que recibe la notificación',
    required: false,
  })
  @ApiQuery({
    name: 'emitterId',
    type: 'number',
    example: 1,
    description: 'ID del usuario que envía la notificación',
    required: false,
  })
  @ApiOkResponse({
    type: GetNotificationsRecords,
    description: 'Ejemplo de respuesta al obtener las notificaciones',
  })
  async findAll(
    @Query()
    {
      pageNumber,
      pageSize,
      approvement,
      rolId,
      emitterId,
      entityId,
    }: GetNotificationsDto,
    @Res() response,
  ) {
    try {
      return response.status(HttpStatus.OK).json(
        await this.notificationsService.findAll({
          pageNumber: +pageNumber,
          pageSize: +pageSize,
          approvement: +approvement,
          rolId: +rolId,
          emitterId: +emitterId,
          entityId: +entityId,
        }),
      );
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: 'ID de la notificación',
    required: true,
  })
  @ApiQuery({
    name: 'approvement',
    type: 'number',
    example: 1,
    description: 'ID de la solicitud de aprobación',
    required: false,
  })
  @ApiQuery({
    name: 'rolId',
    type: 'number',
    example: 1,
    description: 'ID del rol del usuario que recibe la notificación',
    required: false,
  })
  @ApiQuery({
    name: 'emitterId',
    type: 'number',
    example: 1,
    description: 'ID del usuario que envía la notificación',
    required: false,
  })
  @ApiQuery({
    name: 'entityId',
    type: 'number',
    example: 1,
    description:
      'ID del estado al cual pertenece el usuario que recibe la notificación',
    required: false,
  })
  @ApiOkResponse({
    type: GetNotificationDto,
    description: 'Ejemplo de respuesta al obtener la notificación',
  })
  @ApiNotFoundResponse({
    description: 'Notificación no encontrada',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Parametro no existente',
          description: 'Mensaje de error',
        },
        statusCode: {
          type: 'number',
          example: 404,
          description: 'Código de error',
        },
        error: {
          type: 'string',
          example: 'Not Found',
          description: 'Nombre del error',
        },
      },
    },
  })
  async findOne(
    @Param('id') id: string,
    @Query()
    { approvement, rolId, emitterId, entityId }: GetNotificationDto,
    @Res() response,
  ) {
    try {
      const { data, status } = await this.notificationsService.findOne(+id, {
        approvement: +approvement,
        rolId: +rolId,
        emitterId: +emitterId,
        entityId: +entityId,
      });
      return response.status(status).json(data);
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: 'ID de la notificación',
    required: true,
  })
  @ApiOkResponse({
    type: UpdatedNotificationDto,
    description: 'Ejemplo de respuesta al actualizar la notificación',
  })
  @ApiNotFoundResponse({
    description: 'Notificación no encontrada',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Parametro no existente',
          description: 'Mensaje de error',
        },
        statusCode: {
          type: 'number',
          example: 404,
          description: 'Código de error',
        },
        error: {
          type: 'string',
          example: 'Not Found',
          description: 'Nombre del error',
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateNotificationDto,
    @Res() response,
  ) {
    try {
      const { status, data } = await this.notificationsService.update(
        +id,
        body,
      );
      return response.status(status).json(data);
    } catch (e) {
      throw e;
    }
  }
}
