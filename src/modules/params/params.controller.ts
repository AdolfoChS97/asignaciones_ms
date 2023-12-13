import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
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
  findAll() {
    return this.paramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paramsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParamDto: UpdateParamDto) {
    return this.paramsService.update(+id, updateParamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paramsService.remove(+id);
  }
}
