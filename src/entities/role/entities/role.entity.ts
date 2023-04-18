import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

import { TRole } from '../../../common/types';
import { ERole } from '../../../common/enums';

import { Permission } from './permission.entity';

@Schema()
export class Role extends Document {
  @Prop({
    required: true,
    enum: ERole,
  })
  role: TRole;

  @Prop({
    type: mongoose.Types.Array<Permission>,
    default: [],
  })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
