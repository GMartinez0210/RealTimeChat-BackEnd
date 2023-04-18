import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role, RoleSchema } from './entities/role.entity';

import { ProvidersModule } from '../../providers/providers.module';
import { AdaptersModule } from '../../adapters/adapters.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
    ProvidersModule,
    AdaptersModule,
  ],
  controllers: [RoleController],
  providers: [RoleController, RoleService],
  exports: [RoleController, RoleService, ProvidersModule, AdaptersModule],
})
export class RoleModule {}
