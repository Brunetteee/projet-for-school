import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../repositories/services/user.repository';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenService } from './token.service';
import { UserMapper } from '../../users/services/user.mapper';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';

import { RefreshTokenRepository } from '../../repositories/services/refresh-token.repository';
import { AuthCacheService } from './auth-cache.service';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { IUserData } from '../../users/models/interfaces/user-data.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private refreshTokenRepository: RefreshTokenRepository,
    private authCacheService: AuthCacheService,
  ) {}

  public async SignUp(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const tokens = await this.tokenService.generateAndSaveTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    return { user: UserMapper.forResDto(user), tokens };
  }

  public async SignIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const tokens = await this.tokenService.generateAndSaveTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    const userEntity = await this.userRepository.findOneBy({ id: user.id });
    return { user: UserMapper.forResDto(userEntity), tokens };
  }

  public async SignOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);
    const tokens = await this.tokenService.generateAndSaveTokens({
      userId: userData.userId,
      deviceId: userData.deviceId,
    });
    return tokens;
  }

  private async isEmailNotExistOrThrow(email: string): Promise<void> {
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('Email already exists');
    }
  }
}
