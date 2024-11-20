import { Injectable } from '@nestjs/common';
import { UpdateAccountReqDto } from '../models/dto/req/update-account.req.dto';

import { AccountRepository } from '../../repositories/services/account.repository';
import { UserID } from '../../../common/types/entity-ids.type';
import { AccountEntity } from '../../../database/entities/account-entity';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async updateAccountType(
    userId: UserID,
    dto: UpdateAccountReqDto,
  ): Promise<AccountEntity> {
    const user = await this.accountRepository.findOneBy({ userId: userId });

    this.accountRepository.merge(user, dto);
    return await this.accountRepository.save(user);
  }
}
