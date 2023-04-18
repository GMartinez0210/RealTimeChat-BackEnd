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

import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactDto, SearchContactDto } from './dto';

import {
  IChildCrudController,
  IParamChildCrudServiceCreateOne,
  IParamChildCrudServiceDeleteOne,
  IParamChildCrudServiceFindAll,
  IParamChildCrudServiceFindOne,
  IParamChildCrudServiceFindOneById,
  IParamChildCrudServiceUpdateOne,
} from '../../../../common/interfaces';
import { ParseObjectIdPipe } from '../../../../common/pipes';

import { ChildCrudAdapter } from '../../../../adapters/controller';

@Controller('user/:userId/contact')
export class ContactController implements IChildCrudController {
  constructor(
    private readonly childCrudAdapter: ChildCrudAdapter,
    private readonly contactService: ContactService,
  ) {
    this.childCrudAdapter = new ChildCrudAdapter(this.contactService);
  }

  @Post()
  async createOne<Contact>(
    @Param('userId', new ParseObjectIdPipe()) userId: Types.ObjectId,
    @Body() createContactDto: CreateContactDto,
  ) {
    const params: IParamChildCrudServiceCreateOne = {
      parentId: userId,
      createDto: createContactDto,
    };

    return await this.childCrudAdapter.createOne<Contact>(params);
  }

  @Get()
  async findAll<Contact>(
    @Param('userId', new ParseObjectIdPipe()) userId: Types.ObjectId,
  ) {
    const params: IParamChildCrudServiceFindAll = {
      parentId: userId,
    };

    return await this.childCrudAdapter.findAll<Contact>(params);
  }

  @Get('search')
  async findOne<Contact>(
    @Param('userId', new ParseObjectIdPipe()) userId: Types.ObjectId,
    @Query() query: SearchContactDto,
  ) {
    const filter: FilterQuery<Contact> = query;

    const params: IParamChildCrudServiceFindOne = {
      parentId: userId,
      filter,
    };

    return await this.childCrudAdapter.findOne<Contact>(params);
  }

  @Get(':contactId')
  async findOneById<Contact>(
    @Param('userId', new ParseObjectIdPipe()) userId: Types.ObjectId,
    @Param('contactId', new ParseObjectIdPipe()) contactId: Types.ObjectId,
  ) {
    const params: IParamChildCrudServiceFindOneById = {
      parentId: userId,
      childId: contactId,
    };

    return await this.childCrudAdapter.findOneById<Contact>(params);
  }

  @Patch(':contactId')
  async updateOne<Contact>(
    @Param('userId', new ParseObjectIdPipe()) userId: Types.ObjectId,
    @Param('contactId', new ParseObjectIdPipe()) contactId: Types.ObjectId,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const params: IParamChildCrudServiceUpdateOne = {
      parentId: userId,
      childId: contactId,
      updateDto: updateContactDto,
    };

    return await this.childCrudAdapter.updateOne<Contact>(params);
  }

  @Delete(':contactId')
  async deleteOne<Contact>(
    @Param('userId', new ParseObjectIdPipe()) userId: Types.ObjectId,
    @Param('contactId', new ParseObjectIdPipe()) contactId: Types.ObjectId,
  ) {
    const params: IParamChildCrudServiceDeleteOne = {
      parentId: userId,
      childId: contactId,
    };

    return await this.childCrudAdapter.deleteOne<Contact>(params);
  }
}
