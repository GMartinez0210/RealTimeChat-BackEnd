import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { FilterQuery, Types } from 'mongoose';

import { RoleService } from './role.service';

import { CreateRoleDto, SearchRoleDto, UpdateRoleDto } from './dto/role';

import {
  ICrudController,
  IParamCrudServiceCreateOne,
  IParamCrudServiceDeleteOne,
  IParamCrudServiceFindOne,
  IParamCrudServiceFindOneById,
  IParamCrudServiceUpdateOne,
} from '../../common/interfaces';
import { ParseObjectIdPipe } from '../../common/pipes';

import { CrudAdapter } from '../../adapters/controller';

@Controller('role')
export class RoleController implements ICrudController {
  constructor(
    private readonly crudAdapter: CrudAdapter,
    private readonly roleService: RoleService,
  ) {
    this.crudAdapter = new CrudAdapter(this.roleService);
  }

  @Post()
  async createOne<Role>(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    const params: IParamCrudServiceCreateOne = {
      createDto: createRoleDto,
    };
    return await this.crudAdapter.createOne<Role>(params);
  }

  @Get()
  async findAll<Role>(): Promise<Role[]> {
    return await this.crudAdapter.findAll<Role[]>();
  }

  @Get('search')
  async findOne<Role>(@Query() query: SearchRoleDto): Promise<Role> {
    const filter: FilterQuery<Role> = query;

    const params: IParamCrudServiceFindOne = {
      filter,
    };

    return await this.crudAdapter.findOne<Role>(params);
  }

  @Get(':id')
  async findOneById<Role>(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  ): Promise<Role> {
    const params: IParamCrudServiceFindOneById = {
      id,
    };

    return await this.crudAdapter.findOneById<Role>(params);
  }

  @Patch(':id')
  async updateOne<Role>(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    const params: IParamCrudServiceUpdateOne = {
      id,
      updateDto: updateRoleDto,
    };

    return await this.crudAdapter.updateOne<Role>(params);
  }

  @Delete(':id')
  async deleteOne<Role>(
    @Param('id', new ParseObjectIdPipe()) id: Types.ObjectId,
  ): Promise<Role> {
    const params: IParamCrudServiceDeleteOne = {
      id,
    };

    return await this.crudAdapter.deleteOne<Role>(params);
  }
}
