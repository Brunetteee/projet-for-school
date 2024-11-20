import { ArticleResDto } from './article-base.res.dto';
import { ListArticleReqDto } from '../req/list-article.req.dto';

export class ArticleListResDto extends ListArticleReqDto {
  data: ArticleResDto[];
  total: number;
}
