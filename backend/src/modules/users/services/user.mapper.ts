import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload-interface';

export class UserMapper {
  public static forResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      image: `${process.env.AWS_S3_ENDPOINT}/${user.image}`,
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
    };
  }
}
