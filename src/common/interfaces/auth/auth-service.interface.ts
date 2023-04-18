import { IResponseGetJwtToken } from 'src/auth/interfaces/responses/service-response.interface';
import { LoginDto, RegisterDto } from '../../../auth/dto';
import { IParamGetJwtToken } from 'src/auth/interfaces/params/service-param.interface';

export interface IAuthService {
  register<T>(registerDto: RegisterDto): Promise<T>;
  login<T>(loginDto: LoginDto): Promise<T>;
  logout<T>(): Promise<T>;
  verifyToken<T>(): Promise<T>;
  getJwtToken<IResponseGetJwtToken>(params: IParamGetJwtToken): string;
}
