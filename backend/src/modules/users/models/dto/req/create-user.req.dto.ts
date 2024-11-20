import { PickType } from '@nestjs/mapped-types';
import { BaseUserReqDto } from './base-user.req.dto';

export class CreateUserReqDto extends PickType(BaseUserReqDto, [
  'name',
  'email',
  'password',
  'role',
  'accountTypeId',
]) {}
