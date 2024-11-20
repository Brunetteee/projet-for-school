import { UserID } from '../../../../../common/types/entity-ids.type';
import { RoleEnum } from '../../../../role/models/enums/role.enum';

export class UserBaseResDto {
  id: UserID;
  name: string;
  email: string;
  role: RoleEnum;
  bio?: string;
  image?: string;
}
