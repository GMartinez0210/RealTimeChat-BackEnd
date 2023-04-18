import { Prop, Schema } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { THttpMethod } from '../../../common/types';

@Schema()
export class Permission extends Document {
  @Prop({
    required: true,
  })
  httpMethod: THttpMethod;

  @Prop({
    required: true,
  })
  endpoint: string;
}
