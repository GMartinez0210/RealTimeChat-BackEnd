import { IsArray, IsIn, IsString, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

import { TRole } from '../../../../common/types';
import { ERole } from '../../../../common/enums';

import { CreatePermissionDto } from '../permission';

export class CreateRoleDto {
  @IsString()
  @IsIn([ERole.ADMIN, ERole.USER])
  role: TRole;

  @IsArray()
  @ValidateNested()
  @Type(() => CreatePermissionDto)
  permissions: CreatePermissionDto[];
}
