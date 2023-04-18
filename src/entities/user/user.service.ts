import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

import {
  ICrudService,
  IParamCrudServiceCreateOne,
  IParamCrudServiceDeleteOne,
  IParamCrudServiceFindOne,
  IParamCrudServiceFindOneById,
  IParamCrudServiceUpdateOne,
} from '../../common/interfaces';

import { hashPassword } from './helpers';

@Injectable()
export class UserService implements ICrudService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createOne<T>(params: IParamCrudServiceCreateOne): Promise<T> {
    try {
      const { createDto } = params;
      const createUserDto: CreateUserDto = createDto;

      const { email } = createUserDto;
      const filter: FilterQuery<User> = { email };
      const userFound = await this.userModel.findOne(filter);

      if (userFound) {
        throw new BadRequestException(`The email '${email}' is already used`);
      }

      const { password } = createUserDto;
      const passwordHashed = hashPassword(password);

      const userSchema: CreateUserDto = {
        ...createUserDto,
        password: passwordHashed,
      };

      const user = await this.userModel.create(userSchema);
      const result = user as T;

      return result;
    } catch (error) {
      console.log('error | createOne | user sevice');
      throw error;
    }
  }

  async findAll<T>(): Promise<T> {
    try {
      const users = await this.userModel.find().lean();
      const result = users as T;

      return result;
    } catch (error) {
      console.log('error | findAll | user sevice');
      throw error;
    }
  }

  async findOneById<T>(params: IParamCrudServiceFindOneById): Promise<T> {
    try {
      const { id } = params;

      const user = await this.userModel.findById(id).lean();

      if (!user) {
        throw new NotFoundException(`Not exists any user with ID '${id}'`);
      }

      const result = user as T;

      return result;
    } catch (error) {
      console.log('error | findOneById | user sevice');
      throw error;
    }
  }

  async findOne<T>(params: IParamCrudServiceFindOne): Promise<T> {
    try {
      const { filter: filterAux } = params;
      const filter: FilterQuery<User> = filterAux;

      const user = await this.userModel.findOne(filter).lean();

      if (!user) {
        const filterStringify = JSON.stringify(filter);

        throw new NotFoundException(
          `Could not find any user with filter '${filterStringify}'`,
        );
      }

      const result = user as T;

      return result;
    } catch (error) {
      console.log('error | findOne | user sevice');
      throw error;
    }
  }

  async updateOne<T>(params: IParamCrudServiceUpdateOne): Promise<T> {
    try {
      const { id, updateDto } = params;
      const updateUserDto: UpdateUserDto = updateDto;

      const userFound = await this.userModel.findById(id).lean();

      if (!userFound) {
        throw new NotFoundException(`Not exists any user with ID '${id}'`);
      }

      const userSchema: UpdateUserDto = updateUserDto;

      if (userSchema.password) {
        const { password } = userSchema;
        const passwordHashed = hashPassword(password);
        userSchema.password = passwordHashed;
      }

      const update: UpdateQuery<User> = {
        $set: userSchema,
      };

      await this.userModel.findByIdAndUpdate(id, update).lean();

      const user = await this.userModel.findById(id).lean();
      const result = user as T;

      return result;
    } catch (error) {
      console.log('error | updateOne | user sevice');
      throw error;
    }
  }

  async deleteOne<T>(params: IParamCrudServiceDeleteOne): Promise<T> {
    try {
      const { id } = params;

      const userFound = await this.userModel.findById(id).lean();

      if (!userFound) {
        throw new NotFoundException(`Not exists any user with ID '${id}'`);
      }

      const user = await this.userModel.findByIdAndDelete(id).lean();
      const result = user as T;

      return result;
    } catch (error) {
      console.log('error | deleteOne | user sevice');
      throw error;
    }
  }
}
