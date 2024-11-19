import { RoleEnum } from '../../enums/role.enum';
import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformerHelper } from '../../../../../common/helpers/transformer.helper';

export class BaseUserReqDto {
  @IsString()
  @Length(3, 20)
  @Transform(TransformerHelper.trim)
  @Type(() => String)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 300)
  bio?: string;

  @IsString()
  @Length(5, 100)
  @Transform(TransformerHelper.trim)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @IsEnum(RoleEnum)
  @Type(() => String)
  role?: RoleEnum;

  @IsOptional()
  @IsString()
  @Length(0, 3000)
  image?: string;
}
