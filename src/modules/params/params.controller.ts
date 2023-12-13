import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Query,
  Delete, 
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
import {getParamsDto} from './dto/get-param.dto'


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
