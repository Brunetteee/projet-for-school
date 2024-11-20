import { RoleEntity } from '../../../database/entities/role-entity';
import { RoleResDto } from '../models/dto/res/role.res.dto';

export class RolesMapper {
  public static toResDto(role: RoleEntity): RoleResDto {
    return {
      roleId: role.id,
      name: role.name,
    };
  }
}
