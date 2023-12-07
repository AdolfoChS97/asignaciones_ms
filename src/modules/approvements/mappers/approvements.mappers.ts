import { HttpStatus } from '@nestjs/common';
import { createApprovement } from '../dto/create-approvements.dto';
import { UpdatedApprovementDto } from '../dto/update-approvements.dto';



export function generatesApprovementRecord(doc): createApprovement {
    return { data: doc, status: HttpStatus.CREATED };
}

export function generatesUpdatedEvaluatioRecord(doc): UpdatedApprovementDto {
  const { affected } = doc;
  return { data: { rowsAffected: affected }, status: HttpStatus.OK };
}