import { Module } from '@nestjs/common';

import { CrudProvider, AuthProvider, ChildCrudProvider } from './controller';

@Module({
  providers: [AuthProvider, CrudProvider, ChildCrudProvider],
  exports: [AuthProvider, CrudProvider, ChildCrudProvider],
})
export class ProvidersModule {}
