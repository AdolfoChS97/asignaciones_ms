import { Body, Controller, Post } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateObservationDto } from './dtos/create-observation';

@ApiTags('Observations')
@Controller('observations')
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) {}

  @Post()
  async create(@Body() body: CreateObservationDto) {
    try {
      return await this.observationsService.create({ ...body });
    } catch (e) {
      throw e;
    }
  }
}
