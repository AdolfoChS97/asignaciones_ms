import { HttpStatus } from '@nestjs/common';
import { createApprovement } from '../dto/create-approvements.dto';
import { UpdatedApprovementDto } from '../dto/update-approvements.dto';
import { getAprovementsDto, getAprovementDto } from '../dto/get-approvements.dto';

export function generatesApprovementRecord(approvement): createApprovement {
  return { data: approvement, status: HttpStatus.CREATED };
}

export function generatesUpdatedpprovementRecord(
  approvement,
): UpdatedApprovementDto {
  const { affected } = approvement;
  return { data: { rowsAffected: affected }, status: HttpStatus.OK };
}

export function getAprovementRecords(approvements, total): getAprovementsDto {
  return { data: approvements, meta: total, status: HttpStatus.OK };
}

export function getAprovementRecord(approvement) : getAprovementDto{
  return {data : approvement , status: HttpStatus.OK};
}