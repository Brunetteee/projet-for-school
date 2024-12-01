import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { IUserData } from '../../users/models/interfaces/user-data.interface';
import { ListArticleReqDto } from '../../article/models/dto/req/list-article.req.dto';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }

  public async findAll(
    userData: IUserData,
    query: ListArticleReqDto,
  ): Promise<[ArticleEntity[], number]> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    // qb.leftJoinAndSelect('article.tags', 'tag', 'tag.name = :tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
    qb.setParameter('userId', userData.userId);

    if (query.search) {
      qb.andWhere('CONCAT(article.title, article.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    if (query.tag) {
      qb.andWhere('tag.name = :tag', { tag: query.tag });
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getById(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<ArticleEntity> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
    qb.setParameter('userId', userData.userId);

    qb.where('article.id = :articleId', { articleId });
    return await qb.getOne();
  }
}
