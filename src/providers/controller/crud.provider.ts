import { Injectable } from '@nestjs/common';

import {
  ICrudService,
  IParamCrudServiceCreateOne,
  IParamCrudServiceFindOneById,
  IParamCrudServiceFindOne,
  IParamCrudServiceUpdateOne,
  IParamCrudServiceDeleteOne,
} from '../../common/interfaces';

@Injectable()
export class CrudProvider implements ICrudService {
  async createOne<T>(params: IParamCrudServiceCreateOne): Promise<T> {
    return;
  }

  async findAll<T>(): Promise<T> {
    return;
  }

  async findOneById<T>(params: IParamCrudServiceFindOneById): Promise<T> {
    return;
  }

  async findOne<T>(params: IParamCrudServiceFindOne): Promise<T> {
    return;
  }

  async updateOne<T>(params: IParamCrudServiceUpdateOne): Promise<T> {
    return;
  }

  async deleteOne<T>(params: IParamCrudServiceDeleteOne): Promise<T> {
    return;
  }
}
