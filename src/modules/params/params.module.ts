import { Module } from '@nestjs/common';
import { ParamsService } from './params.service';
import { ParamsController } from './params.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Param } from './entities/param.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Param])],
  controllers: [ParamsController],
  providers: [ParamsService],
})
export class ParamsModule {}
