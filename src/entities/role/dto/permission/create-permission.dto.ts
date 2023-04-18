import { IsString } from 'class-validator';

import { THttpMethod } from '../../../../common/types/http-method.type';

export class CreatePermissionDto {
  @IsString()
  httpMethod: THttpMethod;

  @IsString()
  endpoint: string;
}
