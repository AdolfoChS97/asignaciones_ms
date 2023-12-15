import { HttpStatus } from '@nestjs/common';
import { createApprovement } from '../dto/create-approvements.dto';
import { UpdatedApprovementDto } from '../dto/update-approvements.dto';
import {
  GetApprovementRecords,
  GetApprovementRecord,
} from '../dto/get-approvements.dto';

export function generatesApprovementRecord(approvement): createApprovement {
  return { data: approvement, status: HttpStatus.CREATED };
}

export function generatesUpdatedpprovementRecord(
  approvement,
): UpdatedApprovementDto {
  const { affected } = approvement;
  return { data: { rowsAffected: affected }, status: HttpStatus.OK };
}

export function getApprovementRecords(approvements): GetApprovementRecords {
  return { data: approvements, status: HttpStatus.OK };
}

export function getApprovementRecord(approvement): GetApprovementRecord {
  return { data: approvement, status: HttpStatus.OK };
}
