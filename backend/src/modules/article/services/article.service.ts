import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../../repositories/services/article.repository';
import { TagRepository } from '../../repositories/services/tag.repository';
import { CreateArticleReqDto } from '../models/dto/req/create-article.req.dto';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { In } from 'typeorm';
import { ListArticleReqDto } from '../models/dto/req/list-article.req.dto';
import { IUserData } from '../../users/models/interfaces/user-data.interface';
import { UpdateArticleDto } from '../models/dto/req/update-article.req.dto';
import { ArticleID } from '../../../common/types/entity-ids.type';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  public async createArticle(
    userData: IUserData,
    dto: CreateArticleReqDto,
  ): Promise<ArticleEntity> {
    const tags = await this.createTags(dto.tags);

    return await this.articleRepository.save(
      this.articleRepository.create({
        ...dto,
        tags,
        user_id: userData.userId,
      }),
    );
  }

  public async findAllArticles(
    userData: IUserData,
    query: ListArticleReqDto,
  ): Promise<[ArticleEntity[], number]> {
    return await this.articleRepository.findAll(userData, query);
  }

  public async findOne(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<ArticleEntity> {
    return await this.articleRepository.getById(userData, articleId);
  }

  public async updateArticle(
    userData: IUserData,
    articleId: ArticleID,
    dto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.getById(userData, articleId);
    this.articleRepository.merge(article, dto);
    return await this.articleRepository.save(article);
  }

  public async deleteArticle(articleId: ArticleID): Promise<void> {
    await this.articleRepository.delete({ id: articleId });
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || !tags.length) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const exitingTags = entities.map((tag) => tag.name);
    const newTags = tags.filter((tag) => !exitingTags.includes(tag));
    const newEntities = await this.tagRepository.save(
      newTags.map((tag) => this.tagRepository.create({ name: tag })),
    );
    return [...entities, ...newEntities];
  }
}
