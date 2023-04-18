import { Injectable } from '@nestjs/common';

import {
  ICrudService,
  IParamCrudServiceCreateOne,
  IParamCrudServiceDeleteOne,
  IParamCrudServiceFindOne,
  IParamCrudServiceFindOneById,
  IParamCrudServiceUpdateOne,
} from '../../common/interfaces';

import { CrudProvider } from '../../providers/controller';

@Injectable()
export class CrudAdapter implements ICrudService {
  constructor(private readonly crudProvider: CrudProvider) {}

  async createOne<T>(params: IParamCrudServiceCreateOne): Promise<T> {
    return await this.crudProvider.createOne<T>(params);
  }

  async findAll<T>(): Promise<T> {
    return await this.crudProvider.findAll<T>();
  }

  async findOneById<T>(params: IParamCrudServiceFindOneById): Promise<T> {
    return await this.crudProvider.findOneById<T>(params);
  }

  async findOne<T>(params: IParamCrudServiceFindOne): Promise<T> {
    return await this.crudProvider.findOne<T>(params);
  }

  async updateOne<T>(params: IParamCrudServiceUpdateOne): Promise<T> {
    return await this.crudProvider.updateOne<T>(params);
  }

  async deleteOne<T>(params: IParamCrudServiceDeleteOne): Promise<T> {
    return await this.crudProvider.deleteOne<T>(params);
  }
}
