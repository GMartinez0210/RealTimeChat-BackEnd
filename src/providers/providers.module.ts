import { Module } from '@nestjs/common';
import { CrudProvider } from './controller/crud.provider';

@Module({
  providers: [CrudProvider],
  exports: [CrudProvider],
})
export class ProvidersModule {}
