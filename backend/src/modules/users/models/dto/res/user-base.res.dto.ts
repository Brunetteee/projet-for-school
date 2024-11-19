import { RoleEnum } from '../../enums/role.enum';

export class UserBaseResDto {
  id: string;
  name: string;
  email: string;
  role: RoleEnum;
  bio?: string;
  image?: string;
}
