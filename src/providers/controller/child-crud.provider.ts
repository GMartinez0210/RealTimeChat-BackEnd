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

@Injectable()
export class ChildCrudProvider implements IChildCrudService {
  async createOne<T>(params: IParamChildCrudServiceCreateOne): Promise<T> {
    return;
  }

  async findAll<T>(params: IParamChildCrudServiceFindAll): Promise<T> {
    return;
  }

  async findOneById<T>(params: IParamChildCrudServiceFindOneById): Promise<T> {
    return;
  }

  async findOne<T>(params: IParamChildCrudServiceFindOne): Promise<T> {
    return;
  }

  async updateOne<T>(params: IParamChildCrudServiceUpdateOne): Promise<T> {
    return;
  }

  async deleteOne<T>(params: IParamChildCrudServiceDeleteOne): Promise<T> {
    return;
  }
}
