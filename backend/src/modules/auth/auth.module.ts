import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { RedisModule } from '../redis/redis.module';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [RedisModule],
  controllers: [AuthController],
  providers: [AuthService, AuthCacheService, TokenService],
  exports: [],
})
export class AuthModule {}
