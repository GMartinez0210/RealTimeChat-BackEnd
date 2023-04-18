import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { CreateRoleDto } from './dto/role/create-role.dto';
import { UpdateRoleDto } from './dto/role/update-role.dto';
import { Role } from './entities/role.entity';

import {
  ICrudService,
  IParamCrudServiceCreateOne,
  IParamCrudServiceDeleteOne,
  IParamCrudServiceFindOne,
  IParamCrudServiceFindOneById,
  IParamCrudServiceUpdateOne,
} from '../../common/interfaces';

@Injectable()
export class RoleService implements ICrudService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  async createOne<T>(params: IParamCrudServiceCreateOne): Promise<T> {
    try {
      const { createDto } = params;
      const createRoleDto: CreateRoleDto = createDto;

      const { role } = createRoleDto;
      const filter: FilterQuery<Role> = { role };
      const roleFound = await this.roleModel.findOne(filter).lean();

      if (roleFound) {
        throw new BadRequestException(`The role '${role}' already exists`);
      }

      const roleSchema: CreateRoleDto = { ...createRoleDto };

      const roleCreated = await this.roleModel.create(roleSchema);
      const result = roleCreated as T;

      return result;
    } catch (error) {
      console.log('error | createOne | role sevice');
      throw error;
    }
  }

  async findAll<T>(): Promise<T> {
    try {
      const roles = await this.roleModel.find().lean();
      const result = roles as T;

      return result;
    } catch (error) {
      console.log('error | findAll | role sevice');
      throw error;
    }
  }

  async findOne<T>(params: IParamCrudServiceFindOne): Promise<T> {
    try {
      const { filter: filterAux } = params;
      const filter: FilterQuery<Role> = filterAux;

      const role = await this.roleModel.findOne(filter).lean();

      if (!role) {
        const filterStringify = JSON.stringify(filter);

        throw new NotFoundException(
          `Could not find any role with filter '${filterStringify}'`,
        );
      }

      const result = role as T;

      return result;
    } catch (error) {
      console.log('error | findOne | role sevice');
      throw error;
    }
  }

  async findOneById<T>(params: IParamCrudServiceFindOneById): Promise<T> {
    try {
      const { id } = params;

      const role = await this.roleModel.findById(id).lean();

      if (!role) {
        throw new NotFoundException(`Not exists any role with ID '${id}'`);
      }

      const result = role as T;

      return result;
    } catch (error) {
      console.log('error | findOneById | role service');
      throw error;
    }
  }

  async updateOne<T>(params: IParamCrudServiceUpdateOne): Promise<T> {
    try {
      const { id, updateDto } = params;
      const updateRoleDto: UpdateRoleDto = updateDto;

      const roleFound = await this.roleModel.findById(id).lean();

      if (!roleFound) {
        throw new NotFoundException(`Not exists any role with ID '${id}'`);
      }

      const roleSchema: UpdateRoleDto = updateRoleDto;

      const update: UpdateQuery<Role> = {
        $set: roleSchema,
      };

      await this.roleModel.findByIdAndUpdate(id, update).lean();

      const role = await this.roleModel.findById(id).lean();
      const result = role as T;

      return result;
    } catch (error) {
      console.log('error | updateOne | role service');
      throw error;
    }
  }

  async deleteOne<T>(params: IParamCrudServiceDeleteOne): Promise<T> {
    try {
      const { id } = params;

      const roleFound = await this.roleModel.findById(id).lean();

      if (!roleFound) {
        const error = new Error();
        error.message = `Not exists any role with ID '${id}'`;

        throw error;
      }

      const role = await this.roleModel.findByIdAndDelete(id).lean();
      const result = role as T;

      return result;
    } catch (error) {
      console.log('error | deleteOne | role sevice');
      throw error;
    }
  }
}
