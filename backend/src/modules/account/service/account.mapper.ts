import { AccountResDto } from '../models/dto/res/account.res.dto';
import { AccountEntity } from '../../../database/entities/account-entity';

export class AccountMapper {
  public static toResDto(role: AccountEntity): AccountResDto {
    return {
      userId: role.userId,
      name: role.name,
    };
  }
}
