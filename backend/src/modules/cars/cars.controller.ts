import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { CarsService } from './services/cars.service';

import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CarRepository } from '../repositories/services/car.repository';
import { CreateCarReqDto } from './models/dto/req/create-car.req.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserID } from '../../common/types/entity-ids.type';
import { CarsMapper } from './services/cars.mapper';
import { CurrentCar } from '../auth/decorators/current-car.decorator';
import { ICarData } from './models/interfaces/car-data.interface';
import { UpdateCarReqDto } from './models/dto/req/update-car.req.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile } from '../../common/decorators/api-file.decorator';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly carsService: CarsService,
  ) {}

  @ApiBearerAuth()
  @Post('create-car')
  public async createCar(
    @CurrentUser() id: UserID,
    @Body() dto: CreateCarReqDto,
  ) {
    const result = await this.carsService.createCar(id, dto);
    return CarsMapper.forResDto(result);
  }

  @ApiBearerAuth()
  @Patch('car')
  public async updateCar(
    @CurrentCar() carData: ICarData,
    @Body() updateCar: UpdateCarReqDto,
  ) {
    const result = await this.carsService.updateCar(carData, updateCar);
    return CarsMapper.forResDto(result);
  }

  @ApiBearerAuth()
  @Delete('car')
  public async deleteCar(@CurrentCar() carData: ICarData): Promise<void> {
    const car = await this.carRepository.findOneBy({ id: carData.carId });
    await this.carRepository.delete(car);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiFile('image', false, true)
  @Post('car/image')
  public async addCarImage(
    @CurrentUser() carData: ICarData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.carsService.addCarImage(carData, file);
  }

  @ApiBearerAuth()
  @Delete('car/image')
  public async deleteAvatar(@CurrentCar() carData: ICarData): Promise<void> {
    await this.carsService.deleteCarImage(carData);
  }
}
