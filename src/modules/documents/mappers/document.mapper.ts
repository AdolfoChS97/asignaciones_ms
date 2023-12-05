import { HttpStatus } from '@nestjs/common';
import { getDocumentsDto, getDocumentDto } from '../dto/get-document.dto';
import { createdDocumentDto } from '../dto/create-document.dto';
import { UpdatedDocumentDto } from '../dto/update-document.dto';

export function getDocumentsRecords(docs, total): getDocumentsDto {
  return { data: docs, meta: total, status: HttpStatus.OK };
}

export function getDocumentRecord(doc): getDocumentDto {
  return { data: doc, status: HttpStatus.OK };
}

export function generatesDocumentRecord(doc): createdDocumentDto {
  return { data: doc, status: HttpStatus.CREATED };
}

export function generatesUpdatedDocumentRecord(doc): UpdatedDocumentDto {
  const { affected } = doc;
  return { data: { rowsAffected: affected }, status: HttpStatus.OK };
}
