import { Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { ConfigService } from '@nestjs/config';
import { Config, redisConfig } from '../../configs/config.type';
import { Redis } from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<redisConfig>('redis');
        return new Redis({
          port: config.port,
          host: config.host,
          password: config.password,
        });
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
