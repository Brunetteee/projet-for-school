import { RoleID } from '../../../../../common/types/entity-ids.type';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { RoleEnum } from '../../enums/role.enum';

export class UpdateRoleReqDto {
  @IsNumber()
  @IsNotEmpty()
  id: RoleID;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  name: RoleEnum;
}
