import { FilterQuery, Types } from 'mongoose';

export interface IParamCrudServiceCreateOne {
  createDto: any | object;
}

export interface IParamCrudServiceFindOneById {
  id: Types.ObjectId;
}

export interface IParamCrudServiceFindOne {
  filter: FilterQuery<unknown>;
}

export interface IParamCrudServiceUpdateOne {
  id: Types.ObjectId;
  updateDto: any | object;
}

export interface IParamCrudServiceDeleteOne {
  id: Types.ObjectId;
}
