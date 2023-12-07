import { HttpStatus } from '@nestjs/common';
import { getEvaluationsDto, getEvaluationDto } from '../dto/get-evaluation.dto';
import { createdEvaluationDto } from '../dto/create-evaluation.dto';
import { UpdatedEvaluationDto } from '../dto/update-evaluation.dto';

export function getEvaluationRecords(docs, total): getEvaluationsDto {
    return { data: docs, meta: total, status: HttpStatus.OK };
  }

  export function getEvaluationRecord(doc): getEvaluationDto {
    return { data: doc, status: HttpStatus.OK };
  }
  
  export function generatesEvaluatioRecord(doc): createdEvaluationDto {
    return { data: doc, status: HttpStatus.CREATED };
  }
  
  export function generatesUpdatedEvaluatioRecord(doc): UpdatedEvaluationDto {
    const { affected } = doc;
    return { data: { rowsAffected: affected }, status: HttpStatus.OK };
  }
  