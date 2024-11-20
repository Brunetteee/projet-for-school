import { Controller, Body, Post, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignUpReqDto } from './models/dto/req/sign-up.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { AuthService } from './services/auth.service';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { SignInReqDto } from './models/dto/req/sign-in.req.dto';
import { CurrentUser } from './decorators/current-user.decorator';

import { TokenPairResDto } from './models/dto/res/token-pair.res.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.quard';
import { IUserData } from '../users/models/interfaces/user-data.interface';
import { BasicAccountGuard } from './guards/account.guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @UseGuards(BasicAccountGuard)
  @Post('sign-up')
  public async SignUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.SignUp(dto);
  }

  @SkipAuth()
  @Post('sign-in')
  public async SignIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.SignIn(dto);
  }

  @ApiBearerAuth()
  @Post('sign-out')
  public async SignOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.SignOut(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }
}
