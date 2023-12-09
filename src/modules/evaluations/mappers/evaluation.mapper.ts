import { HttpStatus } from '@nestjs/common';
import { getEvaluationsDto, getEvaluationDto } from '../dto/get-evaluation.dto';
import { createdEvaluationDto } from '../dto/create-evaluation.dto';
import { UpdatedEvaluationDto } from '../dto/update-evaluation.dto';

export function getEvaluationRecords(evaluations, total): getEvaluationsDto {
  return { data: evaluations, meta: total, status: HttpStatus.OK };
}

export function getEvaluationRecord(evaluation): getEvaluationDto {
  return { data: evaluation, status: HttpStatus.OK };
}

export function generatesEvaluatioRecord(evaluation): createdEvaluationDto {
  return { data: evaluation, status: HttpStatus.CREATED };
}

export function generatesUpdatedEvaluatioRecord(
  evaluation,
): UpdatedEvaluationDto {
  const { affected } = evaluation;
  return { data: { rowsAffected: affected }, status: HttpStatus.OK };
}
