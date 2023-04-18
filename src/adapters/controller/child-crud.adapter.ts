import { Injectable } from '@nestjs/common';

import {
  IChildCrudService,
  IParamChildCrudServiceCreateOne,
  IParamChildCrudServiceFindAll,
  IParamChildCrudServiceFindOneById,
  IParamChildCrudServiceFindOne,
  IParamChildCrudServiceUpdateOne,
  IParamChildCrudServiceDeleteOne,
} from '../../common/interfaces';

import { ChildCrudProvider } from '../../providers/controller';

@Injectable()
export class ChildCrudAdapter implements IChildCrudService {
  constructor(private readonly childCrudProvider: ChildCrudProvider) {}

  async createOne<T>(params: IParamChildCrudServiceCreateOne): Promise<T> {
    return await this.childCrudProvider.createOne<T>(params);
  }

  async findAll<T>(params: IParamChildCrudServiceFindAll): Promise<T> {
    return await this.childCrudProvider.findAll<T>(params);
  }

  async findOneById<T>(params: IParamChildCrudServiceFindOneById): Promise<T> {
    return await this.childCrudProvider.findOneById<T>(params);
  }

  async findOne<T>(params: IParamChildCrudServiceFindOne): Promise<T> {
    return await this.childCrudProvider.findOne<T>(params);
  }

  async updateOne<T>(params: IParamChildCrudServiceUpdateOne): Promise<T> {
    return await this.childCrudProvider.updateOne<T>(params);
  }

  async deleteOne<T>(params: IParamChildCrudServiceDeleteOne): Promise<T> {
    return await this.childCrudProvider.deleteOne<T>(params);
  }
}
