import { ArticleRepository } from './services/article.repository';

import { Global, Module } from '@nestjs/common';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';
import { CarRepository } from './services/car.repository';
import { RoleRepository } from './services/role.repository';
import { TagRepository } from './services/tag.repository';
import { AccountRepository } from './services/account.repository';

const repositories = [
  AccountRepository,
  ArticleRepository,
  CarRepository,
  RefreshTokenRepository,
  RoleRepository,
  TagRepository,
  UserRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
