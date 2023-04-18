import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';

import { ProvidersModule } from '../../providers/providers.module';
import { AdaptersModule } from '../../adapters/adapters.module';
import { ContactModule } from './subcontrollers/contact/contact.module';

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
    ContactModule,
  ],
  controllers: [UserController],
  providers: [UserController, UserService],
  exports: [
    UserController,
    UserService,
    ProvidersModule,
    AdaptersModule,
    ContactModule,
  ],
})
export class UserModule {}
