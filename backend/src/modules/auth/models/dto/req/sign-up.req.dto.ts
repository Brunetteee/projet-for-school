import { PickType } from '@nestjs/mapped-types';
import { BaseAuthReqDto } from './base-auth.req.dto';

export class SignUpReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'bio',
  'name',
  'deviceId',
]) {}
