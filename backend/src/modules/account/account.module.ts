import { Module } from '@nestjs/common';
import { AccountService } from './service/account.service';

@Module({
  controllers: [],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
