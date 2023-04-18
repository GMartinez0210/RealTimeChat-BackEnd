import { Types } from 'mongoose';

export interface ICrudController {
  createOne<T>(createDto: any | object): Promise<T>;
  findAll<T>(): Promise<T[]>;
  findOne<T>(query: any | object): Promise<T>;
  findOneById<T>(id: Types.ObjectId): Promise<T>;
  updateOne<T>(id: Types.ObjectId, updateDto: any | object): Promise<T>;
  deleteOne<T>(id: Types.ObjectId): Promise<T>;
}
