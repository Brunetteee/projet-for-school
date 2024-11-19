import { PartialType } from '@nestjs/mapped-types';
import { SignUpReqDto } from './sign-up.req.dto';

export class UpdateUserDto extends PartialType(SignUpReqDto) {}
