import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { UserRepository } from '../repositories/services/user.repository';
import { UsersService } from './services/users.service';

import { UserMapper } from './services/user.mapper';

import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UserID } from '../../common/types/entity-ids.type';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IUserData } from './models/interfaces/user-data.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile } from '../../common/decorators/api-file.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @SkipAuth()
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData) {
    const result = await this.usersService.findMe(userData);
    return UserMapper.forResDto(result);
  }
  @ApiBearerAuth()
  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() updateUser: UpdateUserReqDto,
  ) {
    const result = await this.usersService.updateMe(userData, updateUser);
    return UserMapper.forResDto(result);
  }

  @ApiBearerAuth()
  @Delete('me')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.removeMe(userData);
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserBaseResDto> {
    const result = await this.usersService.findOne(userId);
    return UserMapper.forResDto(result);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData, file);
  }

  @ApiBearerAuth()
  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteAvatar(userData);
  }
}
