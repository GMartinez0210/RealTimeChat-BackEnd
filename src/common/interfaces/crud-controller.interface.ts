import { ICrudService } from './crud-service.interface';

export interface ICrudController extends ICrudService {
  createOne<T>(...params): Promise<T>;
  findAll<T>(...params): Promise<T[]>;
  findOne<T>(...params): Promise<T>;
  updateOne<T>(...params): Promise<T>;
  deleteOne<T>(...params): Promise<T>;
}
