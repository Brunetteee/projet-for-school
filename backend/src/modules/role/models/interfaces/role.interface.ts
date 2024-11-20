import { RoleID } from '../../../../common/types/entity-ids.type';
import { RoleEnum } from '../enums/role.enum';

export class IRole {
  roleId: RoleID;
  name: RoleEnum;
}
