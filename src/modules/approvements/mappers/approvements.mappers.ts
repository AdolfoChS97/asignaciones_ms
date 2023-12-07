import { HttpStatus } from '@nestjs/common';
import { createApprovement } from '../dto/create-approvements.dto';


export function generatesApprovementRecord(doc): createApprovement {
    return { data: doc, status: HttpStatus.CREATED };
  }