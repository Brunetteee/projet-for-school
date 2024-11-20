import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';
import { TransformerHelper } from '../../../../../common/helpers/transformer.helper';

export class BaseArticleReqDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformerHelper.trim)
  @Type(() => String)
  title: string;

  @IsString()
  @Length(0, 300)
  @Transform(TransformerHelper.trim)
  @Type(() => String)
  description: string;

  @IsString()
  @Length(0, 3000)
  @Transform(TransformerHelper.trim)
  @Type(() => String)
  body: string;

  @IsArray()
  @IsString({ each: true })
  @Length(3, 30, { each: true })
  @ArrayMaxSize(5)
  @Transform(TransformerHelper.trimArray)
  @Transform(TransformerHelper.uniqueItems)
  @Transform(TransformerHelper.toLowerCaseArray)
  tags: string[];
}
