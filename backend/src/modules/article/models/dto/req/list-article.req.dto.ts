import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { TransformerHelper } from '../../../../../common/helpers/transformer.helper';

export class ListArticleReqDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;

  @IsString()
  @IsOptional()
  tag?: string;

  @Transform(TransformerHelper.trim)
  @Transform(TransformerHelper.toLowerCase)
  @IsString()
  @IsOptional()
  search?: string;
}
