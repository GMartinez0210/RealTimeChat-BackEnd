import { LoginDto } from '../../../auth/dto/login.dto';
import { RegisterDto } from '../../../auth/dto/register.dto';

export interface IAuthController {
  register<T>(registerDto: RegisterDto): Promise<T>;
  login<T>(loginDto: LoginDto): Promise<T>;
  logout<T>(...params): Promise<T>;
  verifyToken<T>(...params): Promise<T>;
}
