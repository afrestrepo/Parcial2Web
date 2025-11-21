import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();    
    res.on('finish', () => {
      const elapsed = Date.now() - start;
      const method = req.method;
      const url = req.originalUrl || req.url;
      const status = res.statusCode;
      console.log(`[HTTP] ${method} ${url} - ${status} - ${elapsed}ms`);
    });

    next();
  }
}
