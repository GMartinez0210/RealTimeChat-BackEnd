import { Module } from '@nestjs/common';

import {
  CrudProvider,
  AuthProvider,
  ChildCrudProvider,
} from '../providers/controller/';
import { CrudAdapter, AuthAdapter, ChildCrudAdapter } from './controller';

@Module({
  providers: [
    AuthAdapter,
    AuthProvider,
    CrudAdapter,
    CrudProvider,
    ChildCrudAdapter,
    ChildCrudProvider,
  ],
  exports: [
    AuthAdapter,
    AuthProvider,
    CrudAdapter,
    CrudProvider,
    ChildCrudAdapter,
    ChildCrudProvider,
  ],
})
export class AdaptersModule {}
