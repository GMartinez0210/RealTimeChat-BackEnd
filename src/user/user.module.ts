import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { ProvidersModule } from 'src/providers/providers.module';
import { AdaptersModule } from 'src/adapters/adapters.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ProvidersModule,
    AdaptersModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, ProvidersModule, AdaptersModule],
})
export class UserModule {}
