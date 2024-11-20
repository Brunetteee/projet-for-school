import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './services/article.service';
import { ArticleController } from './article.controller';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [forwardRef(() => RoleModule)],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
