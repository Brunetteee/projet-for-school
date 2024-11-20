import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../../database/entities/account-entity';

@Injectable()
export class AccountRepository extends Repository<AccountEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AccountEntity, dataSource.manager);
  }
}
