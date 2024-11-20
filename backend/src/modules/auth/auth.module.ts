import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { RedisModule } from '../redis/redis.module';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtRefreshGuard } from './guards/jwt-refresh.quard';

@Module({
  imports: [JwtModule, RedisModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtRefreshGuard,
    },
    JwtRefreshGuard,
    AuthService,
    AuthCacheService,
    TokenService,
  ],
  exports: [],
})
export class AuthModule {}
