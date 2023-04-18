import { IsDate, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateContactDto {
  @IsOptional()
  @IsDate()
  addedAt: Date;

  @IsMongoId()
  @Type(() => Types.ObjectId)
  user: Types.ObjectId;

  @IsMongoId()
  @Type(() => Types.ObjectId)
  contact: Types.ObjectId;
}
