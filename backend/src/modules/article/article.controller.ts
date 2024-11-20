import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArticleService } from './services/article.service';
import { IUserData } from '../users/models/interfaces/user-data.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateArticleReqDto } from './models/dto/req/create-article.req.dto';
import { ArticlesMapper } from './services/article.mapper';
import { ArticleResDto } from './models/dto/res/article-base.res.dto';
import { ListArticleReqDto } from './models/dto/req/list-article.req.dto';
import { ArticleListResDto } from './models/dto/res/article-list.res.dto';
import { ArticleID } from '../../common/types/entity-ids.type';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiBearerAuth()
  @Post()
  public async createArticle(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.createArticle(userData, dto);
    return ArticlesMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Get()
  public async findAllArticles(
    @CurrentUser() userData: IUserData,
    @Query() query: ListArticleReqDto,
  ): Promise<ArticleListResDto> {
    const [data, total] = await this.articleService.findAllArticles(
      userData,
      query,
    );
    return ArticlesMapper.toResDtoList(data, total, query);
  }

  @ApiBearerAuth()
  @Get(':articleId')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.findOne(userData, articleId);
    return ArticlesMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Patch(':articleId')
  public async updateArticle(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
    @Body() dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.updateArticle(
      userData,
      articleId,
      dto,
    );
    return ArticlesMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Delete(':articleId')
  public async deleteArticle(
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<void> {
    await this.articleService.deleteArticle(articleId);
  }
}
