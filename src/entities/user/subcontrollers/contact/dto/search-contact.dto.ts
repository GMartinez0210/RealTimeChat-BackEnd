import { IsDate, IsMongoId, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class SearchContactDto {
  @IsOptional()
  @IsDate()
  addedAt: Date;

  @IsOptional()
  @IsMongoId()
  user: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  contact: mongoose.Schema.Types.ObjectId;
}
