import { Injectable } from '@nestjs/common';

import { CarRepository } from '../../repositories/services/car.repository';
import { CarEntity } from '../../../database/entities/car.entity';
import { CreateCarReqDto } from '../models/dto/req/create-car.req.dto';
import { UserID } from '../../../common/types/entity-ids.type';
import { UserRepository } from '../../repositories/services/user.repository';
import { UpdateCarReqDto } from '../models/dto/req/update-car.req.dto';
import { ICarData } from '../models/interfaces/car-data.interface';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { ContentType } from '../../file-storage/enums/content-type.enum';

@Injectable()
export class CarsService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  public async createCar(
    owner_id: UserID,
    dto: CreateCarReqDto,
  ): Promise<CarEntity> {
    const user = await this.userRepository.findOne({
      where: { id: owner_id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const isPremium = user.isPremium;
    if (!isPremium && user.cars.length >= 1) {
      throw new Error('Basic account cannot create more than one car');
    }
    const car = this.carRepository.create({ ...dto, owner: user });
    return await this.carRepository.save(car);
  }

  public async updateCar(
    carId: ICarData,
    dto: UpdateCarReqDto,
  ): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id: carId.carId });
    this.carRepository.merge(car, dto);
    return await this.carRepository.save(car);
  }

  public async deleteCar(carData: ICarData): Promise<void> {
    await this.carRepository.update(
      { id: carData.carId },
      { deleted: new Date() },
    );
    await this.carRepository.delete({ id: carData.carId });
  }

  public async addCarImage(
    carData: ICarData,
    file: Express.Multer.File,
  ): Promise<void> {
    const car = await this.carRepository.findOneBy({ id: carData.carId });
    const pathToFile = await this.fileStorageService.uploadFile(
      file,
      ContentType.IMAGE,
      carData.carId,
    );
    if (car.image) {
      await this.fileStorageService.deleteFile(car.image);
    }
    await this.carRepository.save({ ...car, image: pathToFile });
  }

  public async deleteCarImage(carData: ICarData): Promise<void> {
    const car = await this.carRepository.findOneBy({ id: carData.carId });
    if (car.image) {
      await this.fileStorageService.deleteFile(car.image);
      await this.carRepository.save({ ...car, image: null });
    }
  }
}
