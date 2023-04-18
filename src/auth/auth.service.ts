import { Injectable, InternalServerErrorException } from '@nestjs/common';

import {
  IAuthService,
  IParamCrudServiceCreateOne,
  IParamCrudServiceFindOne,
} from '../common/interfaces';
import { UserService } from '../entities/user/user.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../entities/user/entities/user.entity';

import { comparePassword } from './helpers';
import { IParamGetJwtToken } from './interfaces/params/service-param.interface';
import { JwtService } from '@nestjs/jwt';

import { IResponseLogin } from './interfaces';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register<T>(registerDto: RegisterDto): Promise<T> {
    try {
      const params: IParamCrudServiceCreateOne = {
        createDto: registerDto,
      };
      const userRegistered = await this.userService.createOne(params);
      const result = userRegistered as T;

      return result;
    } catch (error) {
      console.log('error | register | auth sevice');
      throw error;
    }
  }

  async login<T>(loginDto: LoginDto): Promise<T> {
    try {
      const { email, password } = loginDto;

      const paramUserFindOne: IParamCrudServiceFindOne = {
        filter: { email },
      };

      const user = await this.userService.findOne<User>(paramUserFindOne);

      const { password: userPasswordHashed } = user;

      comparePassword(password, userPasswordHashed);

      const paramsGetJwtToken: IParamGetJwtToken = {
        payload: {
          userId: user._id,
        },
      };

      const jwtToken = this.getJwtToken(paramsGetJwtToken);

      const loginResponse: IResponseLogin = {
        token: jwtToken,
      };

      const result = loginResponse as T;

      return result;
    } catch (error) {
      console.log('error | login | auth sevice');
      throw error;
    }
  }

  async logout<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async verifyToken<T>(): Promise<T> {
    throw new Error('Method not implemented.');
  }

  getJwtToken<IResponseGetJwtToken>(params: IParamGetJwtToken): string {
    const { payload } = params;
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
