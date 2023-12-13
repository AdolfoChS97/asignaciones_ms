import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Query,
  Res, 
  HttpStatus } from '@nestjs/common';
import { ParamsService } from './params.service';
import { CreateParamDto } from './dto/create-param.dto';
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
import { UpdateParamDto } from './dto/update-param.dto';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import {getParamsDto, getParamDto} from './dto/get-param.dto'
import { response } from 'express';


@ApiTags('Params')
@Controller('params')
export class ParamsController {
  constructor(private readonly paramsService: ParamsService) {}

  @Post()
 @ApiCreatedResponse({
  description : 'Devuelve un arreglo de parametros',
  type : CreateParamDto,
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
  @Body() CreateParamDto : CreateParamDto,
  @Res() response,
){
  try {
    const param = 
    await this.paramsService.create(CreateParamDto);
    return response.status(HttpStatus.CREATED).json(param)
  } catch (e) {
    throw e;
  }
}


  @Get()
  @ApiQuery({ name: 'pageNumber', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiOkResponse({
    description: 'Devuelve un arreglo de documentos segun la paginación',
    type: getParamsDto,
  })
  async findAll(
    @Query() { pageNumber, pageSize }: PaginationQueryParamsDto,
    @Res() response,
  ) {
  try {
    const data = await this.paramsService.findAll({
      pageNumber: +pageNumber,
      pageSize: + pageSize,
    });
    return response.status(HttpStatus.OK).json(data);
  } catch (e) {
    throw e
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
    type: getParamDto,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el parametro',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not Found' },
        error: { type: 'string', example: 'parametro not found with id: 1' },
      },
    },
  })
  async findOne(@Param('id') id: string, @Res() response ) {
    try {
        const param = await this.paramsService.findOne(+id);
        response.status(HttpStatus.OK).json(param)
    } catch (e) {
      throw e
    }
  }




  @Patch(':id')
  @ApiOkResponse({
    description: 'Devuelve un digito 1 si se actualiza el parametro',
    type: UpdateParamDto,
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
    type: UpdateParamDto,
    description: 'Cuerpo de la solicitud',
  })
  async update(
    @Param('id') id: number, 
    @Body() body: UpdateParamDto, 
    @Res()response,
    ) {
    try {
      return response
      .status(HttpStatus.OK)
      .json(await this.paramsService.update(+id, {...body}));
    } catch (e) {
      throw e;
    }
  }

}
