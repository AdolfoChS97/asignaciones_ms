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
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import {
  CreateDocumentDto,
  createdDocumentDto,
} from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
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
import { getDocumentsDto } from './dto/get-document.dto';

@Controller('documents')
@ApiTags('Documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Devuelve un arreglo de documentos segun la paginación',
    type: createdDocumentDto,
  })
  @ApiBadRequestResponse({
    description: 'Error al crear el documento',
    type: BadRequestException,
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
  @ApiNotFoundResponse({
    description: 'No se encontro el documento',
    type: NotFoundException,
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
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(+id, updateDocumentDto);
  }
}
