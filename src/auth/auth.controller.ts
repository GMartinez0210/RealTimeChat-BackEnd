import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto, LoginDto } from './dto';

import { IAuthController } from '../common/interfaces';

import { AuthAdapter } from '../adapters/controller';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    private readonly authAdapter: AuthAdapter,
    private readonly authService: AuthService,
  ) {
    this.authAdapter = new AuthAdapter(this.authService);
  }

  @Post('register')
  async register<T>(@Body() registerDto: RegisterDto): Promise<T> {
    return await this.authAdapter.register<T>(registerDto);
  }

  @Post('login')
  async login<IResponseLogin>(
    @Body() loginDto: LoginDto,
  ): Promise<IResponseLogin> {
    return await this.authAdapter.login<IResponseLogin>(loginDto);
  }

  @Post('logout')
  async logout<T>(): Promise<T> {
    return await this.authAdapter.logout<T>();
  }

  @Post('verifyToken')
  async verifyToken<T>(): Promise<T> {
    return await this.authAdapter.verifyToken<T>();
  }
}
