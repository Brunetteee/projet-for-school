import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Config, JwtConfig } from '../../../configs/config.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { IJwtPayload } from '../models/interfaces/jwt-payload-interface';
import { ITokenPair } from '../models/interfaces/token-pair.interface';

import { RefreshTokenRepository } from '../../repositories/services/refresh-token.repository';
import { AuthCacheService } from './auth-cache.service';
import { SaveTokenReqDto } from '../models/dto/req/save-token.req.dto';
import { UserRepository } from '../../repositories/services/user.repository';
import { TokenType } from '../models/enums/token-type.enum';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  public async generateAuthToken(payload: IJwtPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpiresIn,
    });
    return { accessToken, refreshToken };
  }

  public async generateAndSaveTokens(
    dto: SaveTokenReqDto,
  ): Promise<ITokenPair> {
    const tokens = await this.generateAuthToken({
      userId: dto.userId,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        dto.userId,
        dto.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          id: dto.userId,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    return tokens;
  }

  public async verifyToken(
    token: string,
    type: TokenType,
  ): Promise<IJwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.getSecret(type),
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getSecret(type: TokenType): string {
    let secret: string;
    switch (type) {
      case TokenType.ACCESS:
        secret = this.jwtConfig.accessSecret;
        break;
      case TokenType.REFRESH:
        secret = this.jwtConfig.refreshSecret;
        break;
      default:
        throw new Error('Invalid token type');
    }
    return secret;
  }
}
