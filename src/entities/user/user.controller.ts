import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';

import { FilterQuery, Types } from 'mongoose';

import { UserService } from './user.service';

import { CreateUserDto, UpdateUserDto, SearchUserDto } from './dto';

import { ParseObjectIdPipe } from '../../common/pipes';
import {
  ICrudController,
  IParamCrudServiceCreateOne,
  IParamCrudServiceDeleteOne,
  IParamCrudServiceFindOne,
  IParamCrudServiceFindOneById,
  IParamCrudServiceUpdateOne,
} from '../../common/interfaces';

import { CrudAdapter } from '../../adapters/controller/crud.adapter';

@Controller('user')
export class UserController implements ICrudController {
  constructor(
    private readonly crudAdapter: CrudAdapter,
    private readonly userService: UserService,
  ) {
    this.crudAdapter = new CrudAdapter(this.userService);
  }

  @Post()
  async createOne<User>(@Body() createUserDto: CreateUserDto): Promise<User> {
    const params: IParamCrudServiceCreateOne = {
      createDto: createUserDto,
    };

    return await this.crudAdapter.createOne<User>(params);
  }

  @Get()
  async findAll<User>(): Promise<User[]> {
    return await this.crudAdapter.findAll<User[]>();
  }

  @Get('search')
  async findOne<User>(@Query() query: SearchUserDto): Promise<User> {
    const filter: FilterQuery<User> = query;

    const params: IParamCrudServiceFindOne = {
      filter,
    };

    return await this.crudAdapter.findOne<User>(params);
  }

  @Get(':id')
  async findOneById<User>(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  ): Promise<User> {
    const params: IParamCrudServiceFindOneById = {
      id,
    };

    return await this.crudAdapter.findOneById<User>(params);
  }

  @Patch(':id')
  async updateOne<User>(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const params: IParamCrudServiceUpdateOne = {
      id,
      updateDto: updateUserDto,
    };

    return await this.crudAdapter.updateOne<User>(params);
  }

  @Delete(':id')
  async deleteOne<User>(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  ): Promise<User> {
    const params: IParamCrudServiceDeleteOne = {
      id,
    };

    return await this.crudAdapter.deleteOne<User>(params);
  }
}
