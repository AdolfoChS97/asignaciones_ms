import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  Res,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApprovementsService } from './approvements.service';
import { CreateApprovementDto } from './dto/create-approvements.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  // ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  UpdateApprovementDto,
  UpdatedApprovementDto,
} from './dto/update-approvements.dto';
import {
  getApprovementsByQueryParams,
  getAprovementDto,
} from './dto/get-approvements.dto';

@Controller('approvements')
@ApiTags('Approvements')
export class ApprovementsController {
  constructor(private readonly approvementsService: ApprovementsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Devuelve un objeto de aprobaciones segun la paginación',
    type: CreateApprovementDto,
  })
  @ApiBadRequestResponse({
    description: 'No puede estar vacio los campos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'No puede estar vacio los campos' },
      },
    },
  })
  async create(
    @Body() CreateApprovementDto: CreateApprovementDto,
    @Res() response,
  ) {
    try {
      const doc = await this.approvementsService.create(CreateApprovementDto);
      return response.status(HttpStatus.CREATED).json(doc);
    } catch (e) {
      throw e;
    }
  }

  @Get()
  @ApiQuery({ name: 'pageNumber', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiQuery({ name: 'rolId', type: 'number', required: false, example: 1 })
  @ApiQuery({
    name: 'applicationId',
    type: 'number',
    required: false,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Devuelve un object de aprobaciones segun la pagina',
    type: getAprovementDto,
  })
  async findAll(
    @Query()
    {
      pageNumber,
      pageSize,
      rolId,
      applicationId,
      userId
    }: getApprovementsByQueryParams,
    @Res() response,
  ) {
    try {
      const data = await this.approvementsService.findAll({
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        rolId: +rolId,
        applicationId: +applicationId,
        userId: +userId,
      });
      return response.status(HttpStatus.OK).json(data);
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Id de la aprobación',
  })
  @ApiQuery({ name: 'rolId', type: 'number', required: false, example: 1 })
  @ApiQuery({
    name: 'applicationId',
    type: 'number',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'userId',
    type: 'number',
    required: false,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Devuelve una aprobación segun el id',
    type: getAprovementDto,
  })
  @ApiBadRequestResponse({
    description: 'NO se encontro la aprobación',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Not Found' },
        error: { type: 'string', example: 'Solicitud incorrecta' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No se encontro la aprobación',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not found' },
        error: { type: 'string', example: 'Aprobación no encontrada con: 1' },
      },
    },
  })
  async findOne(
    @Param('id') id: string,
    @Query()
    { rolId, applicationId, userId }: getApprovementsByQueryParams,
    @Res() response,
  ) {
    try {
      const approvement = await this.approvementsService.findOne(+id, {
        rolId,
        applicationId,
        userId,
      });
      response.status(HttpStatus.OK).json(approvement);
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Devuelve un digito 1 si se actualiza la aprobación',
    type: UpdatedApprovementDto,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro la aprobación',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not Found' },
        error: { type: 'string', example: 'Aprobación no encontrada con: 1' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'No hay propiedades para actualizar',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'string',
          example: 'No hay propiedades para actualizar',
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateApprovementDto: UpdateApprovementDto,
  ) {
    return this.approvementsService.update(+id, updateApprovementDto);
  }
}
