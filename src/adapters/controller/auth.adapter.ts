import { Injectable } from '@nestjs/common';

import { IAuthService } from '../../common/interfaces';
import { AuthProvider } from '../../providers/controller';
import { IParamGetJwtToken } from 'src/auth/interfaces/params/service-param.interface';

@Injectable()
export class AuthAdapter implements IAuthService {
  constructor(private readonly authProvider: AuthProvider) {}

  async register<T>(registerDto: object): Promise<T> {
    return await this.authProvider.register<T>(registerDto);
  }

  async login<T>(loginDto: object): Promise<T> {
    return await this.authProvider.login<T>(loginDto);
  }

  async logout<T>(): Promise<T> {
    return await this.authProvider.logout<T>();
  }

  async verifyToken<T>(): Promise<T> {
    return await this.authProvider.verifyToken<T>();
  }

  getJwtToken<IResponseGetJwtToken>(params: IParamGetJwtToken): string {
    return this.authProvider.getJwtToken(params);
  }
}
