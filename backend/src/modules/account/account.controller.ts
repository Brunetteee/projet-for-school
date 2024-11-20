import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Patch } from '@nestjs/common';
import { AccountService } from './service/account.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserID } from '../../common/types/entity-ids.type';
import { UpdateAccountReqDto } from './models/dto/req/update-account.req.dto';
import { AccountMapper } from './service/account.mapper';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Patch('account-type')
  public async updateAccountType(
    @CurrentUser() userId: UserID,
    @Body() updateAccount: UpdateAccountReqDto,
  ) {
    const result = await this.accountService.updateAccountType(
      userId,
      updateAccount,
    );
    return AccountMapper.toResDto(result);
  }
}
