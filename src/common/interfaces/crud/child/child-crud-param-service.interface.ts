import { FilterQuery, Types } from 'mongoose';

export interface IParamChildCrudServiceCreateOne {
  parentId: Types.ObjectId;
  createDto: any;
}

export interface IParamChildCrudServiceFindAll {
  parentId: Types.ObjectId;
}

export interface IParamChildCrudServiceFindOneById {
  parentId: Types.ObjectId;
  childId: Types.ObjectId;
}

export interface IParamChildCrudServiceFindOne {
  parentId: Types.ObjectId;
  filter: FilterQuery<unknown>;
}

export interface IParamChildCrudServiceUpdateOne {
  parentId: Types.ObjectId;
  childId: Types.ObjectId;
  updateDto: any;
}

export interface IParamChildCrudServiceDeleteOne {
  parentId: Types.ObjectId;
  childId: Types.ObjectId;
}
