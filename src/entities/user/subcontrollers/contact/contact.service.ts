import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

import { Contact } from './entities/contact.entity';
import { CreateContactDto, UpdateContactDto } from './dto';

import {
  IChildCrudService,
  IParamChildCrudServiceCreateOne,
  IParamChildCrudServiceDeleteOne,
  IParamChildCrudServiceFindAll,
  IParamChildCrudServiceFindOne,
  IParamChildCrudServiceFindOneById,
  IParamChildCrudServiceUpdateOne,
} from '../../../../common/interfaces';

@Injectable()
export class ContactService implements IChildCrudService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<Contact>,
  ) {}

  async createOne<T>(params: IParamChildCrudServiceCreateOne): Promise<T> {
    try {
      const { createDto } = params;
      const createContactDto: CreateContactDto = createDto;

      const { user: userString, contact: contactString } = createContactDto;

      const user = new Types.ObjectId(userString);
      const contact = new Types.ObjectId(contactString);

      // TODO make a guard which validate
      // TODO if the userId is the same from
      // TODO the createContactDto
      //const isTheSameUser = String(userId) == String(user);
      //console.log('isTheSameUser: ', isTheSameUser);
      //return;

      const filter: FilterQuery<Contact> = { user, contact };
      const contactFound = await this.contactModel.findOne(filter);

      if (contactFound) {
        throw new BadRequestException(
          `The user '${user}' have already added the contact '${contact}'`,
        );
      }

      const contactSchema: CreateContactDto = {
        ...createContactDto,
        user,
        contact,
      };

      console.log('contactSchema: ', contactSchema);

      const contactCreated = await this.contactModel.create(contactSchema);
      const result = contactCreated as T;

      return result;
    } catch (error) {
      console.log('error | createOne | contact sevice');
      throw error;
    }
  }

  async findAll<T>(params: IParamChildCrudServiceFindAll): Promise<T> {
    try {
      const { parentId: userId } = params;

      const user = new mongoose.Types.ObjectId(userId);

      const filter: FilterQuery<Contact> = { user };

      console.log('filter: ', filter);

      const contacts = await this.contactModel
        .find(filter)
        .populate({
          path: 'contact',
          select: {
            password: 0,
            contacts: 0,
          },
        })
        .lean();

      const result = contacts as T;

      return result;
    } catch (error) {
      console.log('error | findAll | contact sevice');
      throw error;
    }
  }

  async findOneById<T>(params: IParamChildCrudServiceFindOneById): Promise<T> {
    try {
      const { parentId: userId, childId: contactId } = params;

      const filter: FilterQuery<Contact> = {
        user: userId,
        contact: contactId,
      };

      const contact = await this.contactModel
        .findOne(filter)
        .populate({
          path: 'contact',
          select: {
            password: 0,
            contacts: 0,
          },
        })
        .lean();

      if (!contact) {
        throw new NotFoundException(
          `The user with ID ${userId} does not have any contact with ID '${contactId}'`,
        );
      }

      const result = contact as T;

      return result;
    } catch (error) {
      console.log('error | findOneById | contact sevice');
      throw error;
    }
  }

  async findOne<T>(params: IParamChildCrudServiceFindOne): Promise<T> {
    try {
      const { parentId: userId, filter: filterAux } = params;

      const filter: FilterQuery<Contact> = {
        ...filterAux,
        user: userId,
      };

      const contact = await this.contactModel
        .findOne(filter)
        .populate({
          path: 'contact',
          select: {
            password: 0,
            contacts: 0,
          },
        })
        .lean();

      if (!contact) {
        const filterStringify = JSON.stringify(filter);

        throw new NotFoundException(
          `Could not find any contact with filter '${filterStringify}'`,
        );
      }

      const result = contact as T;

      return result;
    } catch (error) {
      console.log('error | findOne | contact sevice');
      throw error;
    }
  }

  async updateOne<T>(params: IParamChildCrudServiceUpdateOne): Promise<T> {
    try {
      const { parentId: userId, childId: contactId, updateDto } = params;
      const updateContactDto: UpdateContactDto = updateDto;

      const filter: FilterQuery<Contact> = {
        user: userId,
        contact: contactId,
      };

      const contactFound = await this.contactModel.findOne(filter).lean();

      if (!contactFound) {
        throw new NotFoundException(
          `The user with ID ${userId} does not have any contact with ID '${contactId}'`,
        );
      }

      const contactSchema: UpdateContactDto = updateContactDto;

      const update: UpdateQuery<Contact> = {
        $set: contactSchema,
      };

      await this.contactModel.updateOne(filter, update).lean();

      const contact = await this.contactModel.findOne(filter).lean();
      const result = contact as T;

      return result;
    } catch (error) {
      console.log('error | updateOne | contact sevice');
      throw error;
    }
  }

  async deleteOne<T>(params: IParamChildCrudServiceDeleteOne): Promise<T> {
    try {
      const { parentId: userId, childId: contactId } = params;

      const filter: FilterQuery<Contact> = {
        user: userId,
        contact: contactId,
      };

      const contact = await this.contactModel.findOne(filter).lean();

      if (!contact) {
        throw new NotFoundException(
          `The user with ID ${userId} does not have any contact with ID '${contactId}'`,
        );
      }

      await this.contactModel.deleteOne(filter);

      const result = contact as T;

      return result;
    } catch (error) {
      console.log('error | deleteOne | contact sevice');
      throw error;
    }
  }
}
