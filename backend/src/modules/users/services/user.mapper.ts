import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../models/dto/res/user.res.dto';

export class UserMapper {
  public static forResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
    };
  }
}
