import { Module } from '@nestjs/common';
import { CrudProvider } from 'src/providers/controller/crud.provider';
import { CrudAdapter } from './controller/crud.adapter';

@Module({
  providers: [CrudAdapter, CrudProvider],
  exports: [CrudAdapter, CrudProvider],
})
export class AdaptersModule {}
