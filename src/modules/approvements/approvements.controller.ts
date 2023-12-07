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

@Controller('approvements')
@ApiTags('Approvements')
export class ApprovementsController {
  constructor(private readonly approvementsService: ApprovementsService) {}

@Post()
@ApiCreatedResponse({
  description : 'Devuelve un objeto de aprovaciones segun la paginacion', 
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

}
