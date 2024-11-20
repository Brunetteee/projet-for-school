import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { RoleEnum } from '../../role/models/enums/role.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);

export const CurrentRole = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.res.locals.role;
  },
);
