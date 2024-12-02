import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repositories/services/user.repository';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserID } from '../../../common/types/entity-ids.type';

import { UpdateUserDto } from '../../auth/models/dto/req/update-user.dto';
import { RefreshTokenRepository } from '../../repositories/services/refresh-token.repository';

import { IUserData } from '../models/interfaces/user-data.interface';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { ContentType } from '../../file-storage/enums/content-type.enum';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository,
    private fileStorageService: FileStorageService,
  ) {}

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  public async removeMe(userData: IUserData): Promise<void> {
    await this.userRepository.update(
      { id: userData.userId },
      { deleted: new Date() },
    );
    await this.refreshTokenRepository.delete({ id: userData.userId });
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  public async uploadAvatar(
    userData: IUserData,
    file: Express.Multer.File,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    const pathToFile = await this.fileStorageService.uploadFile(
      file,
      ContentType.IMAGE,
      userData.userId,
    );
    if (user.image) {
      await this.fileStorageService.deleteFile(user.image);
    }
    await this.userRepository.save({ ...user, image: pathToFile });
  }

  public async deleteAvatar(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (user.image) {
      await this.fileStorageService.deleteFile(user.image);
      await this.userRepository.save({ ...user, image: null });
    }
  }
}
