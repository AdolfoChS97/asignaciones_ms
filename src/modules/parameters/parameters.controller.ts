import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { CreateParameterDto } from './dto/create-parameter.dto';
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
import { UpdateParameterDto } from './dto/update-parameter.dto';
import {
  getParametersDto,
  getParameterDto,
  GetParameterByGroup,
  GetParameterByStatus,
} from './dto/get-parameter.dto';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';

@ApiTags('Parameters')
@Controller('parameters')
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Devuelve un arreglo de parametros',
    type: CreateParameterDto,
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
    @Body() CreateParameterDto: CreateParameterDto,
    @Res() response,
  ) {
    try {
      const parameter = await this.parametersService.create(CreateParameterDto);
      return response.status(HttpStatus.CREATED).json(parameter);
    } catch (e) {
      throw e;
    }
  }

  @Get('types')
  @ApiQuery({ name: 'pageNumber', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiQuery({
    name: 'statusParam',
    type: 'boolean',
    required: false,
    example: true,
    description: 'Estado del parametro',
  })
  @ApiOkResponse({
    description: 'Devuelve un arreglo de parametros segun la paginación',
    type: getParametersDto,
  })
  @ApiBadRequestResponse({
    description: 'No se encontro el parametro',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad request' },
        error: { type: 'string', example: 'Solicitud Incrorrecta' },
      },
    },
  })
  async findAllTypes(
    @Query() { pageNumber, pageSize, statusParam }: GetParameterByStatus,
    @Res() response,
  ) {
    try {
      const data = await this.parametersService.findAllTypes({
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        statusParam: statusParam,
      });
      return response.status(HttpStatus.OK).json(data);
    } catch (e) {
      throw e;
    }
  }

  @Get()
  @ApiQuery({ name: 'pageNumber', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiQuery({
    name: 'name',
    type: 'string',
    required: false,
    example: 'activo',
  })
  @ApiQuery({
    name: 'type',
    type: 'string',
    required: false,
    example: 'tipo',
  })
  @ApiQuery({
    name: 'statusParam',
    type: 'bool',
    required: false,
    example: 'true',
  })
  @ApiQuery({
    name: 'description',
    type: 'string',
    required: false,
    example: 'Descripción del parametro a buscar',
  })
  @ApiOkResponse({
    description: 'Devuelve un arreglo de parametros segun la paginación',
    type: getParametersDto,
  })
  @ApiBadRequestResponse({
    description: 'No se encontro el parametro',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad request' },
        error: { type: 'string', example: 'Solicitud Incrorrecta' },
      },
    },
  })
  async findAll(
    @Query()
    {
      pageNumber,
      pageSize,
      name,
      statusParam,
      type,
      description,
    }: GetParameterByGroup,
    @Res() response,
  ) {
    try {
      const data = await this.parametersService.findAll({
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        name: name,
        statusParam: statusParam,
        type: type,
        description: description,
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
    description: 'Id del parametro',
  })
  @ApiOkResponse({
    description: 'Devuelve un parametro segun el id',
    type: getParameterDto,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el parameteretro',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not Found' },
        error: {
          type: 'string',
          example: 'parameteretro not found with id: 1',
        },
      },
    },
  })
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const parameter = await this.parametersService.findOne(+id);
      response.status(HttpStatus.OK).json(parameter);
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Devuelve un digito 1 si se actualiza el parametro',
    type: UpdateParameterDto,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el parametro',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not Found' },
        error: { type: 'string', example: 'Parametro no encontrada con: 1' },
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
  @ApiBody({
    type: UpdateParameterDto,
    description: 'Cuerpo de la solicitud',
  })
  async update(
    @Param('id') id: number,
    @Body() body: UpdateParameterDto,
    @Res() response,
  ) {
    try {
      return response
        .status(HttpStatus.OK)
        .json(await this.parametersService.update(+id, { ...body }));
    } catch (e) {
      throw e;
    }
  }
}
