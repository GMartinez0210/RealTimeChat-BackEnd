import {
  IParamCrudServiceCreateOne,
  IParamCrudServiceFindOneById,
  IParamCrudServiceFindOne,
  IParamCrudServiceUpdateOne,
  IParamCrudServiceDeleteOne,
} from './crud-param-service.interface';

export interface ICrudService {
  createOne<T>(params: IParamCrudServiceCreateOne): Promise<T>;
  findAll<T>(): Promise<T[]>;
  findOneById<T>(params: IParamCrudServiceFindOneById): Promise<T>;
  findOne<T>(params: IParamCrudServiceFindOne): Promise<T>;
  updateOne<T>(params: IParamCrudServiceUpdateOne): Promise<T>;
  deleteOne<T>(params: IParamCrudServiceDeleteOne): Promise<T>;
}
