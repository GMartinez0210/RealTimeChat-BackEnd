export { IAuthController } from './auth/auth-controller.interface';
export { IAuthService } from './auth/auth-service.interface';

export { ICrudController } from './crud/crud-controller.interface';
export { ICrudService } from './crud/crud-service.interface';
export {
  IParamCrudServiceCreateOne,
  IParamCrudServiceFindOneById,
  IParamCrudServiceFindOne,
  IParamCrudServiceUpdateOne,
  IParamCrudServiceDeleteOne,
} from './crud/crud-param-service.interface';

export { IChildCrudController } from './crud/child/child-crud-controller.interface';
export { IChildCrudService } from './crud/child/child-crud-service.interface';
export {
  IParamChildCrudServiceCreateOne,
  IParamChildCrudServiceFindAll,
  IParamChildCrudServiceFindOneById,
  IParamChildCrudServiceFindOne,
  IParamChildCrudServiceUpdateOne,
  IParamChildCrudServiceDeleteOne,
} from './crud/child/child-crud-param-service.interface';
