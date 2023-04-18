import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

import { User } from '../../../entities/user.entity';

@Schema()
export class Contact extends Document {
  @Prop({
    type: Date,
    default: Date.now,
  })
  addedAt: Date;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
  })
  contact: User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
