import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AccountGuards implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user.accountType !== 'premium') {
      throw new ForbiddenException('This available only for premium accounts');
    }
    return true;
  }
}

@Injectable()
export class BasicAccountGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.accountType !== 'basic') {
      user.accountType = 'basic';
    }
    return true;
  }
}
