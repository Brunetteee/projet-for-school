import { UserID } from '../../../../common/types/entity-ids.type';
import { AccountTypesEnum } from '../enums/account-type.enum';

export class IAccount {
  userId: UserID;
  name: AccountTypesEnum;
}
