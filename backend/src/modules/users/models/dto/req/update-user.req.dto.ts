import { PickType } from '@nestjs/mapped-types';
import { BaseUserReqDto } from './base-user.req.dto';

export class UpdateUserReqDto extends PickType(BaseUserReqDto, [
  'name',
  'email',
  'role',
  'accountTypeId',
  'password',
]) {}
