import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.header('x-api-key');
    const validtoken = 'admin123';
    if (token !== validtoken) {
      throw new UnauthorizedException('Missing or invalid API key');
    }

    return true;
  }
}
