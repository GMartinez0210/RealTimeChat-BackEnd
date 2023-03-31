import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const regex = /^[0-9a-fA-F]{24}$/;
    if (!value || !value.match(regex)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const objectId = new Types.ObjectId(value);

    if (!objectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return objectId;
  }
}
