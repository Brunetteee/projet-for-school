import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseCarReqDto {
  @IsString()
  brand?: string;

  @IsString()
  model?: string;

  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
