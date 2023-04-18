import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './entities/user/user.module';
import { CommonModule } from './common/common.module';
import { AdaptersModule } from './adapters/adapters.module';
import { ProvidersModule } from './providers/providers.module';
import { RoleModule } from './entities/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CommonModule,
    AuthModule,
    UserModule,
    AdaptersModule,
    ProvidersModule,
    RoleModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
