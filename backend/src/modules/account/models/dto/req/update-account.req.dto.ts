import { UserID } from '../../../../../common/types/entity-ids.type';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { RoleEnum } from '../../../../role/models/enums/role.enum';
import { AccountTypesEnum } from '../../enums/account-type.enum';

export class UpdateAccountReqDto {
  @IsNumber()
  @IsNotEmpty()
  userId: UserID;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  name: AccountTypesEnum;
}
