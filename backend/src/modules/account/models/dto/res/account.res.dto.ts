import { UserID } from '../../../../../common/types/entity-ids.type';
import { AccountTypesEnum } from '../../enums/account-type.enum';

export class AccountResDto {
  userId: UserID;
  name: AccountTypesEnum;
}
