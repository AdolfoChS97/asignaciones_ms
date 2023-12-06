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
import { DocumentsService } from './documents.service';
import {
  CreateDocumentDto,
  createdDocumentDto,
} from './dto/create-document.dto';
import {
  UpdateDocumentDto,
  UpdatedDocumentDto,
} from './dto/update-document.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import { getDocumentDto, getDocumentsDto } from './dto/get-document.dto';

@Controller('documents')
@ApiTags('Documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Devuelve un objeto documento creado',
    type: createdDocumentDto,
  })
  @ApiBadRequestResponse({
    description: 'No hay una cadena base64 valida',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Is not valid base64 string' },
      },
    },
  })
  async create(@Body() createDocumentDto: CreateDocumentDto, @Res() response) {
    try {
      const doc = await this.documentsService.create(createDocumentDto);
      return response.status(HttpStatus.CREATED).json(doc);
    } catch (e) {
      throw e;
    }
  }

  @Get()
  @ApiQuery({ name: 'pageNumber', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiOkResponse({
    description: 'Devuelve un arreglo de documentos segun la paginación',
    type: getDocumentsDto,
  })
  async findAll(
    @Query() { pageNumber, pageSize }: PaginationQueryParamsDto,
    @Res() response,
  ) {
    try {
      const data = await this.documentsService.findAll({
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
    description: 'Id del documento',
  })
  @ApiOkResponse({
    description: 'Devuelve un documento segun el id',
    type: getDocumentDto,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el documento',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not Found' },
        error: { type: 'string', example: 'Document not found with id: 1' },
      },
    },
  })
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const doc = await this.documentsService.findOne(+id);
      response.status(HttpStatus.OK).json(doc);
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Devuelve un digito 1 si se actualizo el documento',
    type: UpdatedDocumentDto,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el documento',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Not Found' },
        error: { type: 'string', example: 'Document not found with id: 1' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'No hay propiedades para actualizar',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'No properties to update' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'No hay una cadena base64 valida',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Is not valid base64 string' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(+id, updateDocumentDto);
  }
}
