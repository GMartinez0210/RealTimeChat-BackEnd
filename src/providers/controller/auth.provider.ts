import { Injectable } from '@nestjs/common';

import { IAuthService } from '../../common/interfaces/auth/auth-service.interface';
import { IParamGetJwtToken } from 'src/auth/interfaces/params/service-param.interface';

@Injectable()
export class AuthProvider implements IAuthService {
  register<T>(registerDto: object): Promise<T> {
    return;
  }

  login<T>(loginDto: object): Promise<T> {
    return;
  }

  logout<T>(): Promise<T> {
    return;
  }

  verifyToken<T>(): Promise<T> {
    return;
  }

  getJwtToken<IResponseGetJwtToken>(params: IParamGetJwtToken): string {
    return;
  }
}
