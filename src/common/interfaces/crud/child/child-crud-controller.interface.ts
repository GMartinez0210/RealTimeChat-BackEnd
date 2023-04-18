import { Types } from 'mongoose';

export interface IChildCrudController {
  createOne<T>(parentId: Types.ObjectId, createDto: any): Promise<T>;
  findAll<T>(parentId: Types.ObjectId): Promise<T[]>;
  findOne<T>(parentId: Types.ObjectId, query: any): Promise<T>;
  findOneById<T>(parentId: Types.ObjectId, childId: Types.ObjectId): Promise<T>;
  updateOne<T>(
    parentId: Types.ObjectId,
    childId: Types.ObjectId,
    updateDto: any,
  ): Promise<T>;
  deleteOne<T>(parentId: Types.ObjectId, childId: Types.ObjectId): Promise<T>;
}
