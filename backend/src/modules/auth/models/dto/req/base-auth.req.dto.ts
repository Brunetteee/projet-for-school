import { PickType } from '@nestjs/mapped-types';
import { BaseUserReqDto } from '../../../../users/models/dto/req/base-user.req.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'name',
  'bio',
  'email',
  'password',
  'role',
  'image',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
