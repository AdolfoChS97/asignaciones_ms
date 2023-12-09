import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import {
  UpdateEvaluationDto,
  UpdatedEvaluationDto,
} from './dto/update-evaluation.dto';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { getEvaluationDto } from './dto/get-evaluation.dto';

@Controller('evaluations')
@ApiTags('Evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Devuelve un arreglo de evaluaciones segun la paginacion',
    type: CreateEvaluationDto,
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
    @Body() CreateEvaluationDto: CreateEvaluationDto,
    @Res() response,
  ) {
    try {
      const evaluation =
        await this.evaluationsService.create(CreateEvaluationDto);
      return response.status(HttpStatus.CREATED).json(evaluation);
    } catch (e) {
      throw e;
    }
  }

  @Get()
  @ApiQuery({ name: 'pageNumber', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiOkResponse({
    description: 'Devuelve un object de evaluaciones segun la paginación',
    type: getEvaluationDto,
  })
  @ApiBadRequestResponse({
    description: 'No se encontro la evaluación',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad request' },
        error: { type: 'string', example: 'Solicitud Incrorrecta' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No se encontro la evaluacion',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not Found' },
        error: { type: 'string', example: 'Evaluación no encontrada con: 1' },
      },
    },
  })
  async findAll(
    @Query() { pageNumber, pageSize }: PaginationQueryParamsDto,
    @Res() response,
  ) {
    try {
      const data = await this.evaluationsService.findAll({
        pageNumber: +pageNumber,
        pageSize: +pageSize,
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
    description: 'Id de la evaluacion',
  })
  @ApiOkResponse({
    description: 'Devuelve una evaluacion segun el id',
    type: getEvaluationDto,
  })
  @ApiBadRequestResponse({
    description: 'No se encontro la evaluacion',
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
    description: 'No se encontro la evaluacion',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not Found' },
        error: { type: 'string', example: 'Evaluación no encontrada con: 1' },
      },
    },
  })
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const evaluation = await this.evaluationsService.findOne(+id);
      response.status(HttpStatus.OK).json(evaluation);
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Devuelve un digito 1 si se actualiza la evaluación',
    type: UpdatedEvaluationDto,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro la evaluacion',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not Found' },
        error: { type: 'string', example: 'Evaluación no encontrada con: 1' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'No hay propiedades para actulizar',
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
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationsService.update(+id, updateEvaluationDto);
  }
}
