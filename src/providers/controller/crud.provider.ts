import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { ICrudService } from 'src/common/interfaces/crud-service.interface';

@Injectable()
export class CrudProvider implements ICrudService {
  async createOne<T>(createDto: object): Promise<T> {
    return;
  }

  async findAll<T>(): Promise<T> {
    return;
  }

  async findOne<T>(filter: FilterQuery<T>): Promise<T> {
    return;
  }

  async updateOne<T>(id: string, updateDto: any): Promise<T> {
    return;
  }

  async deleteOne<T>(id: string): Promise<T> {
    return;
  }
}
