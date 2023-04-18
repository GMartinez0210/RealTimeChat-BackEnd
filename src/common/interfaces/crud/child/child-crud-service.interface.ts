import {
  IParamChildCrudServiceCreateOne,
  IParamChildCrudServiceFindAll,
  IParamChildCrudServiceFindOneById,
  IParamChildCrudServiceFindOne,
  IParamChildCrudServiceUpdateOne,
  IParamChildCrudServiceDeleteOne,
} from './child-crud-param-service.interface';

export interface IChildCrudService {
  createOne<T>(params: IParamChildCrudServiceCreateOne): Promise<T>;
  findAll<T>(params: IParamChildCrudServiceFindAll): Promise<T[]>;
  findOneById<T>(params: IParamChildCrudServiceFindOneById): Promise<T>;
  findOne<T>(params: IParamChildCrudServiceFindOne): Promise<T>;
  updateOne<T>(params: IParamChildCrudServiceUpdateOne): Promise<T>;
  deleteOne<T>(params: IParamChildCrudServiceDeleteOne): Promise<T>;
}
