import { Module } from '@nestjs/common';
import { FileService } from '@shared/services/file.service';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class SharedModule {}
