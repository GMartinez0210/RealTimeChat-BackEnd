import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { ProvidersModule } from '../providers/providers.module';
import { AdaptersModule } from '../adapters/adapters.module';
import { UserModule } from '../entities/user/user.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
    ProvidersModule,
    AdaptersModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, ProvidersModule, AdaptersModule, UserModule],
})
export class AuthModule {}
