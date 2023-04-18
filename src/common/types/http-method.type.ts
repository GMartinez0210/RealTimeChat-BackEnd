import { EHttpMethod } from '../enums';

export type THttpMethod =
  | EHttpMethod.GET
  | EHttpMethod.POST
  | EHttpMethod.PATCH
  | EHttpMethod.DELETE;
