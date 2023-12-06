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
import { ObservationsService } from './observations.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateObservationDto,
  CreatedObservationDto,
} from './dtos/create-observation.dto';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import {
  UpdateObservationDto,
  UpdatedObservationDto,
} from './dtos/update-observation.dto';
import {
  GetObservationDto,
  GetObservationsDto,
} from './dtos/get-observation.dto';

@ApiTags('Observations')
@Controller('observations')
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Id de la observación',
  })
  @ApiOkResponse({
    description: 'Devuelve un objeto Observacion',
    type: GetObservationDto,
  })
  @ApiNotFoundResponse({
    description: 'No hay observaciones',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Not Found',
        },
        error: {
          type: 'string',
          example: 'Observation with id ${id} not found',
        },
      },
    },
  })
  async findOne(@Param('id') id: number, @Res() response) {
    try {
      const observation = await this.observationsService.findone(+id);
      return response.status(HttpStatus.OK).json(observation);
    } catch (e) {
      throw e;
    }
  }

  @Get()
  @ApiQuery({ name: 'pageNumber', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiOkResponse({
    description: 'Devuelve un arreglo de objetos Observacion',
    type: GetObservationsDto,
    isArray: true,
  })
  async findAll(
    @Query() { pageNumber, pageSize }: PaginationQueryParamsDto,
    @Res() response,
  ) {
    try {
      return response.status(HttpStatus.OK).json(
        await this.observationsService.findAll({
          pageNumber: +pageNumber,
          pageSize: +pageSize,
        }),
      );
    } catch (e) {
      throw e;
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Devuelve un objeto Observacion creado',
    type: CreatedObservationDto,
  })
  @ApiBadRequestResponse({
    description: 'Error en la validación de datos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: {
          type: 'string',
          examples: [
            'approves_id is required',
            'approves_id must be number',
            'details is required',
          ],
        },
      },
    },
  })
  async create(@Body() body: CreateObservationDto, @Res() response) {
    try {
      return response
        .status(HttpStatus.CREATED)
        .json(await this.observationsService.create({ ...body }));
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    example: 1,
    description: 'Id de la observación',
  })
  @ApiOkResponse({
    description: 'Devuelve un objeto Observacion actualizado',
    type: UpdatedObservationDto,
  })
  @ApiBadRequestResponse({
    description: 'Error en la validación de datos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: {
          type: 'string',
          examples: [
            'approves_id is required',
            'approves_id must be number',
            'details is required',
            'No properties to update',
          ],
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No hay observaciones',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Not Found',
        },
        error: {
          type: 'string',
          example: 'Observation with id ${id} not found',
        },
      },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() body: UpdateObservationDto,
    @Res() response,
  ) {
    try {
      return response
        .status(HttpStatus.OK)
        .json(await this.observationsService.update(+id, { ...body }));
    } catch (e) {
      throw e;
    }
  }
}
