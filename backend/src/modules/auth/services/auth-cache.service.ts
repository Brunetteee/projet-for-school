import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/services/redis.service';
import { ConfigService } from '@nestjs/config';
import { Config } from '../../../configs/config.type';

@Injectable()
export class AuthCacheService {
  constructor(
    private redisService: RedisService,
    private configService: ConfigService<Config>,
  ) {}

  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = this.getKey(userId, deviceId);

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
  }

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    token: string,
  ) {
    const key = this.getKey(userId, deviceId);

    const tokens = await this.redisService.sMembers(key);
    return tokens.includes(token);
  }

  public async deleteToken(userId: string, deviceId: string): Promise<void> {
    const key = this.getKey(userId, deviceId);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: string, deviceId: string): string {
    return `ACCESS_TOKEN:${userId}:${deviceId}`;
  }
}
