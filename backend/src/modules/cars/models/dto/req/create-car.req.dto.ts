import { PickType } from '@nestjs/mapped-types';
import { BaseCarReqDto } from './base-car.req.dto';

export class CreateCarReqDto extends PickType(BaseCarReqDto, [
  'brand',
  'model',
  'price',
  'description',
  'image',
]) {}
