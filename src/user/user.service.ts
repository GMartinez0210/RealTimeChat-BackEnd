import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model, UpdateQuery } from 'mongoose';

import { ICrudService } from '../common/interfaces';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

import { hashPassword } from './helpers';

@Injectable()
export class UserService implements ICrudService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createOne<T>(createUserDto: CreateUserDto): Promise<T> {
    try {
      const { email } = createUserDto;
      const filter: FilterQuery<User> = { email };
      const userFound = await this.userModel.findOne(filter);

      if (userFound) {
        const error = new Error();
        error.message = `The email: ${email} is already used`;

        throw error;
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
      console.log('error | create | user sevice');
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll<T>(): Promise<T> {
    try {
      const users = await this.userModel.find();
      const result = users as T;

      return result;
    } catch (error) {
      console.log('error | findAll | user sevice');
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOneById<T>(id: string): Promise<T> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        const error = new Error();
        error.message = `Not exists any user with ID: ${id}`;

        throw error;
      }

      const result = user as T;

      return result;
    } catch (error) {
      console.log('error | findOneById | user sevice');
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne<T>(filter: FilterQuery<T>): Promise<T> {
    try {
      const user = await this.userModel.find(filter);

      if (!user) {
        const filterStringify = JSON.stringify(filter);

        throw new NotFoundException(
          `Could not find any user with filter: ${filterStringify}`,
        );
      }

      const result = user as T;

      return result;
    } catch (error) {
      console.log('error | findOne | user sevice');
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }

  async updateOne<T>(id: string, updateUserDto: UpdateUserDto): Promise<T> {
    try {
      const userFound = await this.userModel.findById(id);

      if (!userFound) {
        throw new NotFoundException(`No user found with ID: ${id}`);
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
      await this.userModel.findByIdAndUpdate(id, update);

      const userUpdated = await this.userModel.findById(id);
      const result = userUpdated as T;

      return result;
    } catch (error) {
      console.log('error | updateOne | user sevice');
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteOne<T>(id: string): Promise<T> {
    try {
      const userFound = await this.userModel.findById(id);

      if (!userFound) {
        const error = new Error();
        error.message = `Not exists any user with ID: ${id}`;

        throw error;
      }

      const user = await this.userModel.findByIdAndDelete(id);
      const result = user as T;

      return result;
    } catch (error) {
      console.log('error | deleteOne | user sevice');
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }
}
