import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
  })
  password: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  lastname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
