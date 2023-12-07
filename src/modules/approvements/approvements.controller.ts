import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Patch, 
  Param, 
  Res,
  Query,
  HttpStatus
 } from '@nestjs/common';
import { ApprovementsService } from './approvements.service';
import { CreateApprovementDto } from './dto/create-approvements.dto'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateApprovementDto, UpdatedApprovementDto } from './dto/update-approvements.dto';

@Controller('approvements')
@ApiTags('Approvements')
export class ApprovementsController {
  constructor(private readonly approvementsService: ApprovementsService) {}

@Post()
@ApiCreatedResponse({
  description : 'Devuelve un objeto de aprobaciones segun la paginación', 
  type: CreateApprovementDto,
})
@ApiBadRequestResponse({
  description: 'No puede estar vacio los campos',
  schema: {
    type: 'object',
    properties: {
      statusCode: {type: 'number' , example: 400},
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'No puede estar vacio los campos' },
    },
  },
 })
 async create(@Body() CreateApprovementDto: CreateApprovementDto, @Res() response) {
  try {
    const doc = await this.approvementsService.create(CreateApprovementDto);
    return response.status(HttpStatus.CREATED).json(doc);
  } catch (e) {
    throw e;
  }
}

@Patch(':id')
@ApiOkResponse({
  description : 'Devuelve un digito 1 si se actualiza la aprobación',
  type : UpdatedApprovementDto,
})
@ApiNotFoundResponse({
  description : 'No se encontro la aprobación',
  schema: {
    type : 'object',
    properties : {
      statusCode : {type : 'number' , example: 404},
      message: { type: 'string' , example: 'Not Found' },
      error : { type: 'string' , example : 'Aprobación no encontrada con: 1'}
    }
  }
})


@ApiBadRequestResponse({
  description : 'No hay propiedades para actualizar',
  schema : {
    type : 'object',
    properties:{
      statusCode  : {type : 'number' , example: 400},
      message : {type : 'string' , example: 'No hay propiedades para actualizar'}
    },
  },
})

async update(
  @Param('id') id: string,
  @Body() updateApprovementDto : UpdateApprovementDto) {
    return  this.approvementsService.update(+id , updateApprovementDto)
  }

}
