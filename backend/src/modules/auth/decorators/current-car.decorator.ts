import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCar = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.res.locals.car;
  },
);
