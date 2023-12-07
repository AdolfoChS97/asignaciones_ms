import { HttpStatus } from '@nestjs/common';
import {
  GetObservationsDto,
  GetObservationDto,
} from '../dtos/get-observation.dto';
import { CreatedObservationDto } from '../dtos/create-observation.dto';
import { UpdatedObservationDto } from '../dtos/update-observation.dto';

export function getObservationsRecords(
  observations,
  total,
): GetObservationsDto {
  return { data: observations, meta: total, status: HttpStatus.OK };
}

export function getObservationRecord(observation): GetObservationDto {
  return { data: observation, status: HttpStatus.OK };
}

export function generatesObservationRecord(observation): CreatedObservationDto {
  return { data: observation, status: HttpStatus.CREATED };
}

export function generatesUpdatedObservationRecord(
  observation,
): UpdatedObservationDto {
  const { affected } = observation;
  return { data: { rowsAffected: affected }, status: HttpStatus.OK };
}
