import { PickType } from '@nestjs/mapped-types';
import { CarBaseResDto } from './car-base.res.dto';

export class CarResDto extends PickType(CarBaseResDto, [
  'ownerId',
  'carId',
  'brand',
  'model',
  'price',
  'description',
  'image',
]) {}
