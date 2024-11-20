import { PickType } from '@nestjs/mapped-types';
import { BaseArticleReqDto } from './base-article.req.dto';

export class CreateArticleReqDto extends PickType(BaseArticleReqDto, [
  'title',
  'description',
  'tags',
  'body',
]) {}
