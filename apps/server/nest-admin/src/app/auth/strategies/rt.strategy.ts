import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies['refresh_token'];
          return token;
        },
      ]),
      secretOrKey: 'RT_SECRET',
    });
  }

  validate(req: Request, payload: any): any {
    return {
      ...payload,
      req,
    };
  }
}
