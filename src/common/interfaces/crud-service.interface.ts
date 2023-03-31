import { FilterQuery } from 'mongoose';

export interface ICrudService {
  createOne<T>(createDto: any): Promise<T>;
  findAll<T>(): Promise<T[]>;
  findOne<T>(filter: FilterQuery<T>): Promise<T>;
  updateOne<T>(id: string, updateDto: any): Promise<T>;
  deleteOne<T>(id: string): Promise<T>;
}
