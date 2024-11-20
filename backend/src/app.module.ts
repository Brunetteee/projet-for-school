import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { RepositoryModule } from './modules/repositories/repository.module';
import { RedisModule } from './modules/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './configs/configuration';
import { PostgresModule } from './modules/postgres/postgres.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LoggerModule } from './modules/logger/logger.module';
import { RoleModule } from './modules/role/role.module';
import { CarsModule } from './modules/cars/cars.module';
import { ArticleModule } from './modules/article/article.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AccountModule,
    ArticleModule,
    AuthModule,
    CarsModule,
    LoggerModule,
    PostgresModule,
    RedisModule,
    RepositoryModule,
    RoleModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
