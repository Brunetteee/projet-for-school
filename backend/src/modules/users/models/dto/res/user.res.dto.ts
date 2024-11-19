import { PickType } from '@nestjs/mapped-types';
import { UserBaseResDto } from './user-base.res.dto';

export class UserResDto extends PickType(UserBaseResDto, [
  'id',
  'name',
  'email',
  'role',
  'bio',
]) {}
