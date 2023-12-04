import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import {
  getDocumentsRecords,
  getDocumentRecord,
  generatesDocumentRecord,
} from './mappers/document.mapper';
import { isBase64 } from '@shared/utils/isBase64';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async create({ name, base64, approves_id }: CreateDocumentDto) {
    try {
      isBase64(base64);

      const doc = await this.documentRepository.save({
        name,
        base64,
        approves_id,
      });
      return generatesDocumentRecord(doc);
    } catch (e) {
      throw e;
    }
  }

  async findAll({ pageNumber, pageSize }: PaginationQueryParamsDto) {
    try {
      const [docs, total] = await this.documentRepository.findAndCount({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return getDocumentsRecords(docs, total);
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
    try {
      const doc = await this.documentRepository.findOne({ where: { id: id } });
      if (!doc) throw new NotFoundException(`Document with id ${id} not found`);
      return getDocumentRecord(doc);
    } catch (e) {
      throw e;
    }
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }
}
