import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../repositories/services/user.repository';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenService } from './token.service';
import { UserMapper } from '../../users/services/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
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

  private async isEmailNotExistOrThrow(email: string): Promise<void> {
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('Email already exists');
    }
  }
}
