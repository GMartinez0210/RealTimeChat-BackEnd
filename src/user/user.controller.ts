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

import { FilterQuery } from 'mongoose';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ParseObjectIdPipe } from '../common/pipes';
import { ICrudController } from '../common/interfaces';

import { CrudAdapter } from '../adapters/controller/crud.adapter';
import { SearchUserDto } from './dto/search-user.dto';

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
    return this.crudAdapter.createOne<User>(createUserDto);
  }

  @Get()
  async findAll<User>(): Promise<User[]> {
    return this.crudAdapter.findAll<User[]>();
  }

  @Get('search')
  async findOne<User>(@Query() query: SearchUserDto): Promise<User> {
    const filter: FilterQuery<User> = query;

    return this.crudAdapter.findOne<User>(filter);
  }

  @Get(':id')
  async findOneById<User>(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<User> {
    return this.userService.findOneById<User>(id);
  }

  @Patch(':id')
  async updateOne<User>(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.crudAdapter.updateOne<User>(id, updateUserDto);
  }

  @Delete(':id')
  async deleteOne<User>(@Param('id') id: string): Promise<User> {
    return this.crudAdapter.deleteOne<User>(id);
  }
}
