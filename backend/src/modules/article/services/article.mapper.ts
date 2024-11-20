import { Injectable } from '@nestjs/common';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { UserMapper } from '../../users/services/user.mapper';

import { ArticleListResDto } from '../models/dto/res/article-list.res.dto';
import { ListArticleReqDto } from '../models/dto/req/list-article.req.dto';
import { ArticleResDto } from '../models/dto/res/article-base.res.dto';

@Injectable()
export class ArticlesMapper {
  public static toResDtoList(
    data: ArticleEntity[],
    total: number,
    query: ListArticleReqDto,
  ): ArticleListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: ArticleEntity): ArticleResDto {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      body: data.body,
      created: data.created,
      updated: data.updated,
      tags: data.tags ? data.tags.map((tag) => tag.name) : [],
      user: data.user ? UserMapper.forResDto(data.user) : null,
    };
  }
}
