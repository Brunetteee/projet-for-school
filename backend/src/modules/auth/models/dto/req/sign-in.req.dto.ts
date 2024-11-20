import { PickType } from '@nestjs/mapped-types';
import { BaseAuthReqDto } from './base-auth.req.dto';

export class SignInReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'deviceId',
]) {}
