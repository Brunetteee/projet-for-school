import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { CarsController } from './cars.controller';
import { FileStorageService } from '../file-storage/services/file-storage.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, FileStorageService],
  exports: [CarsService, FileStorageService],
})
export class CarsModule {}
