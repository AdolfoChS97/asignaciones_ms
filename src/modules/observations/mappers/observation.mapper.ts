import { HttpStatus } from '@nestjs/common';
import {
  getObservationsDto,
  getObservationDto,
} from '../dtos/get-observation.dto';

export function getObservationsRecords(
  observations,
  total,
): getObservationsDto {
  return { data: observations, meta: total, status: HttpStatus.OK };
}

export function getObservationRecord(observation): getObservationDto {
  return { data: observation, status: HttpStatus.OK };
}

export function generatesUpdatedObservationRecord(observation) {
  const { affected } = observation;
  return { data: { rowsAffected: affected }, status: HttpStatus.OK };
}
