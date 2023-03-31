import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { ICrudService } from 'src/common/interfaces/crud-service.interface';
import { CrudProvider } from 'src/providers/controller/crud.provider';

@Injectable()
export class CrudAdapter implements ICrudService {
  constructor(private readonly crudProvider: CrudProvider) {}

  async createOne<T>(createDto): Promise<T> {
    return await this.crudProvider.createOne<T>(createDto);
  }

  async findAll<T>(): Promise<T> {
    return await this.crudProvider.findAll<T>();
  }

  async findOne<T>(filter: FilterQuery<T>): Promise<T> {
    return await this.crudProvider.findOne<T>(filter);
  }

  async updateOne<T>(id: string, updateDto: any): Promise<T> {
    return await this.crudProvider.updateOne<T>(id, updateDto);
  }

  async deleteOne<T>(id: string): Promise<T> {
    return await this.crudProvider.deleteOne<T>(id);
  }
}
